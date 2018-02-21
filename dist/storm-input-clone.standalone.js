/**
 * @name storm-input-clone: 
 * @version 0.1.0: Wed, 21 Feb 2018 13:38:01 GMT
 * @author stormid
 * @license MIT
 */
(function(root, factory) {
   var mod = {
       exports: {}
   };
   if (typeof exports !== 'undefined'){
       mod.exports = exports
       factory(mod.exports)
       module.exports = mod.exports.default
   } else {
       factory(mod.exports);
       root.StormInputClone = mod.exports.default
   }

}(this, function(exports) {
   'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var KEY_CODES = {
    ENTER: 13
};

var TRIGGER_EVENTS = ['click', 'keydown'];

var Store = {
    state: {
        count: 1,
        clones: {}
    },
    update: function update(reducer, nextState) {
        this.state = reducer(this.state, nextState);
        console.log(this.state);
    },
    getState: function getState() {
        return this.state;
    }
};

var Reducers = {
    setInitialState: function setInitialState(state, data) {
        return Object.assign({}, state, data);
    },
    addInput: function addInput(state, data) {
        return Object.assign({}, state, {
            clones: Object.assign({}, state.clones, data),
            count: state.count + 1
        });
    }
};

var updateAttributes = function updateAttributes(node, attributes) {
    for (var key in attributes) {
        node.setAttribute(key, attributes[key]);
    }return node;
};

var addInput = function addInput() {
    var node = updateAttributes(Store.getState().input.cloneNode(true), {
        name: Store.getState().name + '[' + Store.getState().count + ']',
        id: Store.getState().name + '_' + Store.getState().count + '_',
        'aria-label': Store.getState().label
    });

    Store.update(Reducers.addInput, _defineProperty({}, Store.getState().name + '[' + Store.getState().count + ']', Store.getState().button.parentNode.insertBefore(node, Store.getState().button)));

    node.focus();
};

var factory = function factory(node) {
    Store.update(Reducers.setInitialState, {
        button: node,
        label: document.querySelector('[for=' + node.getAttribute('data-input')).innerText,
        input: document.getElementById(node.getAttribute('data-input')),
        name: node.getAttribute('data-input-name'),
        count: node.getAttribute('data-input-count') !== undefined ? +node.getAttribute('data-input-count') : Store.getState().count
    });

    TRIGGER_EVENTS.forEach(function (ev) {
        Store.getState().button.addEventListener(ev, function (e) {
            if (!e.keyCode || e.keyCode === KEY_CODES.ENTER) addInput();
        });
    });

    return {
        addInput: addInput
    };
};

/*

- Delete input?
- Allow adding of inputs under any circumstances? if no value in all others/previous one?
- Id/name convention?

*/

var init = function init(sel, opts) {
    var els = [].slice.call(document.querySelectorAll(sel));

    if (!els.length) return console.warn('No input clone buttons found');

    return els.map(function (el) {
        return Object.create(factory(el));
    });
};

var index = { init: init };

exports.default = index;;
}));
