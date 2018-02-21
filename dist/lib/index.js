import { KEY_CODES, TRIGGER_EVENTS } from './constants';
import Store from './store';
import Reducers from './reducers';

const updateAttributes = (node, attributes) => {
    for(let key in attributes) node.setAttribute(key, attributes[key]);
    return node;
};

const addInput = () => {
    let node = updateAttributes(Store.getState().input.cloneNode(true), {
                    name: `${Store.getState().name}[${Store.getState().count}]`,
                    id: `${Store.getState().name}_${Store.getState().count}_`,
                    'aria-label': Store.getState().label
                });

    Store.update(Reducers.addInput, { 
        [`${Store.getState().name}[${Store.getState().count}]`]: Store.getState().button.parentNode.insertBefore(node, Store.getState().button)
    });

    node.focus();
};

export default node => {
    Store.update(Reducers.setInitialState, {
        button: node,
        label: document.querySelector(`[for=${node.getAttribute('data-input')}`).innerText,
        input: document.getElementById(node.getAttribute('data-input')),
        name: node.getAttribute('data-input-name'),
        count: node.getAttribute('data-input-count') !== undefined ? +node.getAttribute('data-input-count') : Store.getState().count
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

/*

- Delete input?
- Allow adding of inputs under any circumstances? if no value in all others/previous one?
- Id/name convention?

*/