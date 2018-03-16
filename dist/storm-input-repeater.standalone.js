/**
 * @name storm-input-repeater: For cloning and managing repeating fields
 * @version 0.1.1: Fri, 16 Mar 2018 16:50:34 GMT
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
       root.StormInputRepeater = mod.exports.default
   }

}(this, function(exports) {
   'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var defaults = {
    deleteButton: {
        type: 'div',
        attributes: { role: 'button', class: 'repeater__delete', tabindex: 0 },
        innerHTML: '<svg height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>'
    },
    container: {
        type: 'div',
        attributes: { class: 'relative repeater__container' }
    },
    name: function name(_name, index) {
        return _name + '[' + index + ']';
    },
    id: function id(name, index) {
        return name + '_' + index + '_';
    }
};

var KEY_CODES = {
    ENTER: 13
};

var TRIGGER_EVENTS = ['click', 'keydown'];

var DATA_ATTRIBUTES = {
    INPUT_ID: 'data-input-id',
    ALPHA_INPUT: 'data-alpha-input',
    NAME_BASE: 'data-input-name-base'
};

var CreateStore = function CreateStore() {
    return {
        state: {
            clones: []
        },
        update: function update(reducer, nextState) {
            var effects = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

            this.state = reducer(this.state, nextState);
            //console.log(this.state);
            if (effects.length > 0) effects.forEach(function (effect) {
                effect();
            });
        },
        getState: function getState() {
            return this.state;
        }
    };
};

var Reducers = {
    setInitialState: function setInitialState(state, data) {
        return Object.assign({}, state, data);
    },
    addInput: function addInput(state, data) {
        return Object.assign({}, state, { clones: [].concat(_toConsumableArray(state.clones), [data]) });
    },
    deleteInput: function deleteInput(state, data) {
        return Object.assign({}, state, { clones: state.clones.filter(function (clone) {
                return clone.button !== data.button;
            }) });
    }
};

var h = function h(vNode) {
    var node = document.createElement(vNode.type);
    for (var key in vNode.attributes) {
        if (key.substr(0, 2) === 'on') node.addEventListener(key.substr(2).toLowerCase(), vNode.attributes[key]);else node.setAttribute(key, vNode.attributes[key]);
    }

    if (vNode.text) node.appendchild(document.createTextNode(vNode.text));
    if (vNode.innerHTML) node.innerHTML = vNode.innerHTML;

    vNode.children && vNode.children.forEach(function (child) {
        if (child.nodeName) node.appendChild(child);else node.appendChild(h(child));
    });

    return node;
};

var updateAttributes = function updateAttributes(node, attributes) {
    for (var key in attributes) {
        node.setAttribute(key, attributes[key]);
    }return node;
};

var clonesFromDOM = function clonesFromDOM(nodes) {
    return nodes.map(function (node) {
        return {
            container: node,
            input: node.firstElementChild,
            button: node.lastElementChild
        };
    });
};

var removeInput = function removeInput(Store) {
    return function () {
        var _this = this;

        var clone = Store.getState().clones.reduce(function (acc, curr) {
            if (curr.button === _this) acc = curr;
            return acc;
        }, false);
        Store.update(Reducers.deleteInput, clone, [function () {
            clone.container.parentNode.removeChild(clone.container);
        }, function () {
            Store.getState().clones.forEach(function (clone, i) {
                updateAttributes(clone.input, {
                    name: Store.getState().settings.name(Store.getState().name, i + 1),
                    id: Store.getState().settings.id(Store.getState().name, i + 1)
                });
            });
        }]);
    };
};

var addInput = function addInput(Store) {
    return function () {
        var node = h(Object.assign({}, Store.getState().settings.container, {
            children: [updateAttributes(Store.getState().input.cloneNode(true), {
                name: Store.getState().settings.name(Store.getState().name, Store.getState().clones.length + 1),
                id: Store.getState().settings.id(Store.getState().name, Store.getState().clones.length + 1),
                'aria-label': Store.getState().label
            }), h(Object.assign({}, Store.getState().settings.deleteButton, {
                attributes: Object.assign({}, Store.getState().settings.deleteButton.attributes, {
                    onclick: removeInput(Store),
                    onkeyup: function onkeyup(e) {
                        if (!e.keyCode || e.keyCode === KEY_CODES.ENTER) removeInput(Store).call(this);
                    }
                })
            }))]
        }));

        Store.update(Reducers.addInput, {
            container: Store.getState().button.parentNode.insertBefore(node, Store.getState().button),
            input: node.firstElementChild,
            button: node.lastElementChild
        });

        node.firstElementChild.focus();
    };
};

var factory = function factory(node, settings) {
    var Store = CreateStore();
    Store.update(Reducers.setInitialState, {
        button: node,
        settings: settings,
        label: document.querySelector('[for="' + node.getAttribute(DATA_ATTRIBUTES.INPUT_ID) + '"]').innerText || '',
        input: document.getElementById(node.getAttribute(DATA_ATTRIBUTES.INPUT_ID)),
        name: node.getAttribute(DATA_ATTRIBUTES.NAME_BASE),
        clones: document.querySelector('[data-alpha-input="' + node.getAttribute(DATA_ATTRIBUTES.INPUT_ID) + '"]') ? clonesFromDOM([].slice.call(document.querySelectorAll('[data-alpha-input="' + node.getAttribute(DATA_ATTRIBUTES.INPUT_ID) + '"]'))) : []
    });
    TRIGGER_EVENTS.forEach(function (ev) {
        Store.getState().button.addEventListener(ev, function (e) {
            if (!e.keyCode || e.keyCode === KEY_CODES.ENTER) addInput(Store)();
        });
        if (Store.getState().clones.length > 0) {
            Store.getState().clones.forEach(function (clone) {
                clone.button.addEventListener(ev, function (e) {
                    if (!e.keyCode || e.keyCode === KEY_CODES.ENTER) {
                        removeInput(Store).call(clone.button);
                    }
                });
            });
        }
    });

    return {
        addInput: addInput(Store)
    };
};

var init = function init(sel, opts) {
    var els = [].slice.call(document.querySelectorAll(sel));

    if (!els.length) return console.warn('No input clone buttons found');

    return els.map(function (el) {
        return Object.assign(factory(el, Object.assign({}, defaults, opts)));
    });
};

var index = { init: init };

exports.default = index;;
}));
