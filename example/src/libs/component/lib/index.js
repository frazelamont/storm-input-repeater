import { KEY_CODES, TRIGGER_EVENTS, DATA_ATTRIBUTES } from './constants';
import CreateStore from './store';
import Reducers from './reducers';
import { h, updateAttributes, clonesFromDOM } from './dom';

const removeInput = function(Store){
    return function(){
        let clone = Store.getState().clones.reduce((acc, curr) => {
            if(curr.button === this) acc = curr;
            return acc;
        }, false);
        Store.update(Reducers.deleteInput, clone, [
            () => { clone.container.parentNode.removeChild(clone.container); },
            () => {
                Store.getState().clones.forEach((clone, i) => {
                    updateAttributes(clone.input, {
                        name: Store.getState().settings.name(Store.getState().name, i + 1),
                        id:  Store.getState().settings.id(Store.getState().name, i + 1)
                    })
                });
            }
        ]);
    };
};

const addInput = Store => () => {
    const node = h(Object.assign({}, 
                    Store.getState().settings.container,
                    {
                        children: [
                            updateAttributes(Store.getState().input.cloneNode(true), {
                                name: Store.getState().settings.name(Store.getState().name, Store.getState().clones.length + 1),
                                id:  Store.getState().settings.id(Store.getState().name, Store.getState().clones.length + 1),
                                'aria-label': Store.getState().label
                            }),
                            h(Object.assign({}, Store.getState().settings.deleteButton, {
                                attributes: Object.assign({}, Store.getState().settings.deleteButton.attributes, {
                                    onclick: removeInput(Store),
                                    onkeyup(e){ if(!e.keyCode || e.keyCode === KEY_CODES.ENTER) removeInput(Store).call(this); }
                                })
                            }))
                        ]
                    })
                );

    Store.update(Reducers.addInput, {
        container: Store.getState().button.parentNode.insertBefore(node, Store.getState().button),
        input: node.firstElementChild,
        button: node.lastElementChild
    });

    node.firstElementChild.focus();
};

export default (node, settings) => {
    const Store = CreateStore();
    Store.update(Reducers.setInitialState, {
        button: node,
        settings,
        label: document.querySelector(`[for="${node.getAttribute(DATA_ATTRIBUTES.INPUT_ID)}"]`).innerText || '',
        input: document.getElementById(node.getAttribute(DATA_ATTRIBUTES.INPUT_ID)),
        name: node.getAttribute(DATA_ATTRIBUTES.NAME_BASE),
        clones: document.querySelector(`[data-alpha-input="${node.getAttribute(DATA_ATTRIBUTES.INPUT_ID)}"]`) ? clonesFromDOM([].slice.call( document.querySelectorAll(`[data-alpha-input="${node.getAttribute(DATA_ATTRIBUTES.INPUT_ID)}"]`))) : []
    });
    TRIGGER_EVENTS.forEach(ev => {
        Store.getState().button.addEventListener(ev, e => {
            if(!e.keyCode || e.keyCode === KEY_CODES.ENTER) addInput(Store)();
        })
        if(Store.getState().clones.length > 0){
            Store.getState().clones.forEach(clone => {
                clone.button.addEventListener(ev, e => {
                    if(!e.keyCode || e.keyCode === KEY_CODES.ENTER) {
                        removeInput(Store).call(clone.button);
                    }
                });
            });
        }
    });

    
    return {
        addInput: addInput(Store)
    }
};