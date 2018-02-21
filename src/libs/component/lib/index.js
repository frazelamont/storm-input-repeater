import { KEY_CODES, TRIGGER_EVENTS } from './constants';
import Store from './store';
import Reducers from './reducers';
import { h, updateAttributes } from './dom';

const addInput = () => {
    const remove = function(){
            //remove DOM node
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
        },
        node = h(Object.assign({}, 
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
                                    onclick: remove,
                                    onkeyup(e){ if(!e.keyCode || e.keyCode === KEY_CODES.ENTER) remove.call(this); }
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
    //construct state from DOM on first load

    Store.update(Reducers.setInitialState, {
        button: node,
        settings,
        label: document.querySelector(`[for=${node.getAttribute('data-input')}`).innerText,
        input: document.getElementById(node.getAttribute('data-input')),
        name: node.getAttribute('data-input-name')
    });

    TRIGGER_EVENTS.forEach(ev => {
        Store.getState().button.addEventListener(ev, e => {
            if(!e.keyCode || e.keyCode === KEY_CODES.ENTER) addInput();
        })
    });

    return {
        addInput
    }
};