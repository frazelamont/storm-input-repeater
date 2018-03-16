(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
'use strict';

var _component = require('./libs/component');

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var onDOMContentLoadedTasks = [function () {
    // console.log(inputClone);
    window.__INPUT_CLONE__ = _component2.default.init('.js-input__clone');
}];

{
    onDOMContentLoadedTasks.forEach(function (fn) {
        return fn();
    });
}

},{"./libs/component":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _defaults = require('./lib/defaults');

var _defaults2 = _interopRequireDefault(_defaults);

var _lib = require('./lib');

var _lib2 = _interopRequireDefault(_lib);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var init = function init(sel, opts) {
	var els = [].slice.call(document.querySelectorAll(sel));

	if (!els.length) return console.warn('No input clone buttons found');

	return els.map(function (el) {
		return Object.assign((0, _lib2.default)(el, Object.assign({}, _defaults2.default, opts)));
	});
};

exports.default = { init: init };

},{"./lib":6,"./lib/defaults":4}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var KEY_CODES = exports.KEY_CODES = {
    ENTER: 13
};

var TRIGGER_EVENTS = exports.TRIGGER_EVENTS = ['click', 'keydown'];

var DATA_ATTRIBUTES = exports.DATA_ATTRIBUTES = {
    INPUT_ID: 'data-input-id',
    ALPHA_INPUT: 'data-alpha-input',
    NAME_BASE: 'data-input-name-base'
};

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
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

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var h = exports.h = function h(vNode) {
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

var updateAttributes = exports.updateAttributes = function updateAttributes(node, attributes) {
    for (var key in attributes) {
        node.setAttribute(key, attributes[key]);
    }return node;
};

var clonesFromDOM = exports.clonesFromDOM = function clonesFromDOM(nodes) {
    return nodes.map(function (node) {
        return {
            container: node,
            input: node.firstElementChild,
            button: node.lastElementChild
        };
    });
};

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _constants = require('./constants');

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

var _reducers = require('./reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _dom = require('./dom');

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var removeInput = function removeInput(Store) {
    return function () {
        var _this = this;

        var clone = Store.getState().clones.reduce(function (acc, curr) {
            if (curr.button === _this) acc = curr;
            return acc;
        }, false);
        Store.update(_reducers2.default.deleteInput, clone, [function () {
            clone.container.parentNode.removeChild(clone.container);
        }, function () {
            Store.getState().clones.forEach(function (clone, i) {
                (0, _dom.updateAttributes)(clone.input, {
                    name: Store.getState().settings.name(Store.getState().name, i + 1),
                    id: Store.getState().settings.id(Store.getState().name, i + 1)
                });
            });
        }]);
    };
};

var addInput = function addInput(Store) {
    return function () {
        var node = (0, _dom.h)(Object.assign({}, Store.getState().settings.container, {
            children: [(0, _dom.updateAttributes)(Store.getState().input.cloneNode(true), {
                name: Store.getState().settings.name(Store.getState().name, Store.getState().clones.length + 1),
                id: Store.getState().settings.id(Store.getState().name, Store.getState().clones.length + 1),
                'aria-label': Store.getState().label
            }), (0, _dom.h)(Object.assign({}, Store.getState().settings.deleteButton, {
                attributes: Object.assign({}, Store.getState().settings.deleteButton.attributes, {
                    onclick: removeInput(Store),
                    onkeyup: function onkeyup(e) {
                        if (!e.keyCode || e.keyCode === _constants.KEY_CODES.ENTER) removeInput(Store).call(this);
                    }
                })
            }))]
        }));

        Store.update(_reducers2.default.addInput, {
            container: Store.getState().button.parentNode.insertBefore(node, Store.getState().button),
            input: node.firstElementChild,
            button: node.lastElementChild
        });

        node.firstElementChild.focus();
    };
};

exports.default = function (node, settings) {
    var Store = (0, _store2.default)();
    Store.update(_reducers2.default.setInitialState, {
        button: node,
        settings: settings,
        label: document.querySelector('[for="' + node.getAttribute(_constants.DATA_ATTRIBUTES.INPUT_ID) + '"]').innerText || '',
        input: document.getElementById(node.getAttribute(_constants.DATA_ATTRIBUTES.INPUT_ID)),
        name: node.getAttribute(_constants.DATA_ATTRIBUTES.NAME_BASE),
        clones: document.querySelector('[data-alpha-input="' + node.getAttribute(_constants.DATA_ATTRIBUTES.INPUT_ID) + '"]') ? (0, _dom.clonesFromDOM)([].slice.call(document.querySelectorAll('[data-alpha-input="' + node.getAttribute(_constants.DATA_ATTRIBUTES.INPUT_ID) + '"]'))) : []
    });
    _constants.TRIGGER_EVENTS.forEach(function (ev) {
        Store.getState().button.addEventListener(ev, function (e) {
            if (!e.keyCode || e.keyCode === _constants.KEY_CODES.ENTER) addInput(Store)();
        });
        if (Store.getState().clones.length > 0) {
            Store.getState().clones.forEach(function (clone) {
                clone.button.addEventListener(ev, function (e) {
                    if (!e.keyCode || e.keyCode === _constants.KEY_CODES.ENTER) {
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

},{"./constants":3,"./dom":5,"./reducers":7,"./store":8}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
            arr2[i] = arr[i];
        }return arr2;
    } else {
        return Array.from(arr);
    }
}

exports.default = {
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

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJleGFtcGxlL3NyYy9hcHAuanMiLCJleGFtcGxlL3NyYy9saWJzL2NvbXBvbmVudC9pbmRleC5qcyIsImV4YW1wbGUvc3JjL2xpYnMvY29tcG9uZW50L2xpYi9jb25zdGFudHMuanMiLCJleGFtcGxlL3NyYy9saWJzL2NvbXBvbmVudC9saWIvZGVmYXVsdHMuanMiLCJleGFtcGxlL3NyYy9saWJzL2NvbXBvbmVudC9saWIvZG9tLmpzIiwiZXhhbXBsZS9zcmMvbGlicy9jb21wb25lbnQvbGliL2luZGV4LmpzIiwiZXhhbXBsZS9zcmMvbGlicy9jb21wb25lbnQvbGliL3JlZHVjZXJzLmpzIiwiZXhhbXBsZS9zcmMvbGlicy9jb21wb25lbnQvbGliL3N0b3JlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7Ozs7Ozs7QUFFQSxJQUFNLDJCQUEyQixZQUFNLEFBQ25DO0FBQ0E7V0FBQSxBQUFPLGtCQUFrQixvQkFBQSxBQUFXLEtBQXBDLEFBQXlCLEFBQWdCLEFBQzVDO0FBSEQsQUFBZ0MsQ0FBQTs7QUFLaEMsQUFBRTs0QkFBQSxBQUF3QixRQUFRLFVBQUEsQUFBQyxJQUFEO2VBQUEsQUFBUTtBQUF4QyxBQUFnRDs7Ozs7Ozs7OztBQ1BsRDs7OztBQUNBOzs7Ozs7OztBQUVBLElBQU0sT0FBTyxTQUFQLEFBQU8sS0FBQSxBQUFDLEtBQUQsQUFBTSxNQUFTLEFBQzNCO0tBQUksTUFBTSxHQUFBLEFBQUcsTUFBSCxBQUFTLEtBQUssU0FBQSxBQUFTLGlCQUFqQyxBQUFVLEFBQWMsQUFBMEIsQUFFbEQ7O0tBQUcsQ0FBQyxJQUFKLEFBQVEsUUFBUSxPQUFPLFFBQUEsQUFBUSxLQUFmLEFBQU8sQUFBYSxBQUVwQzs7WUFBTyxBQUFJLElBQUksY0FBQTtTQUFNLE9BQUEsQUFBTyxPQUFPLG1CQUFBLEFBQVEsSUFBSSxPQUFBLEFBQU8sT0FBUCxBQUFjLHdCQUE5QyxB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aEZhLHlCQUFBLEFBQUMsT0FBRCxBQUFRLE1BQVI7ZUFBaUIsT0FBQSxBQUFPLE9BQVAsQUFBYyxJQUFkLEFBQWtCLE9BQW5DLEFBQWlCLEFBQXlCO0FBRGhELEFBRVg7Y0FBVSxrQkFBQSxBQUFDLE9BQUQsQUFBUSxNQUFSO2VBQWlCLE9BQUEsQUFBTyxPQUFQLEFBQWMsSUFBZCxBQUFrQixPQUFPLEVBQUUscUNBQVksTUFBWixBQUFrQixVQUE5RCxBQUFpQixBQUF5QixBQUFFLEFBQTBCO0FBRnJFLEFBR1g7aUJBQWEscUJBQUEsQUFBQyxPQUFELEFBQVEsTUFBUjtlQUFpQixPQUFBLEFBQU8sT0FBUCxBQUFjLElBQWQsQUFBa0IsU0FBUyxjQUFRLEFBQU0sT0FBTixBQUFhLE9BQU8saUJBQUE7dUJBQVMsTUFBQSxBQUFNLFdBQVcsS0FBMUIsQUFBK0I7QUFBdkcsQUFBaUIsQUFBeUIsQUFBVSxhQUFBLENBQVY7QSxBQUg1QztBQUFBLEFBQ1g7Ozs7Ozs7OztrQkNEVyxZQUFBOzs7b0JBQU8sQUFDWCxBQUNLLEFBRVo7QUFITyxBQUNIO0FBRmMsZ0NBQUEsQUFJWCxTQUpXLEFBSUYsV0FBd0I7Z0JBQWIsQUFBYSw4RUFBSCxBQUFHLEFBQ3BDOztpQkFBQSxBQUFLLFFBQVEsUUFBUSxLQUFSLEFBQWEsT0FBMUIsQUFBYSxBQUFvQixBQUNqQztBQUNBO2dCQUFHLFFBQUEsQUFBUSxTQUFYLEFBQW9CLFdBQUcsQUFBUSxRQUFRLGtCQUFVLEFBQUU7QUFBVTtBQUF0QyxBQUMxQixhQUQwQjtBQVBULEFBU2xCO0FBVGtCLHNDQVNQLEFBQUU7bUJBQU8sS0FBUCxBQUFZLEFBQU87QUFUckIsQUFBTztBQUFBLEFBQ2xCO0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfXJldHVybiBlfSkoKSIsImltcG9ydCBJbnB1dENsb25lIGZyb20gJy4vbGlicy9jb21wb25lbnQnO1xuXG5jb25zdCBvbkRPTUNvbnRlbnRMb2FkZWRUYXNrcyA9IFsoKSA9PiB7XG4gICAgLy8gY29uc29sZS5sb2coaW5wdXRDbG9uZSk7XG4gICAgd2luZG93Ll9fSU5QVVRfQ0xPTkVfXyA9IElucHV0Q2xvbmUuaW5pdCgnLmpzLWlucHV0X19jbG9uZScpO1xufV07XG5cbnsgb25ET01Db250ZW50TG9hZGVkVGFza3MuZm9yRWFjaCgoZm4pID0+IGZuKCkpOyB9IiwiaW1wb3J0IGRlZmF1bHRzIGZyb20gJy4vbGliL2RlZmF1bHRzJztcbmltcG9ydCBmYWN0b3J5IGZyb20gJy4vbGliJztcblxuY29uc3QgaW5pdCA9IChzZWwsIG9wdHMpID0+IHtcblx0bGV0IGVscyA9IFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWwpKTtcblxuXHRpZighZWxzLmxlbmd0aCkgcmV0dXJuIGNvbnNvbGUud2FybignTm8gaW5wdXQgY2xvbmUgYnV0dG9ucyBmb3VuZCcpO1xuICAgIFxuXHRyZXR1cm4gZWxzLm1hcChlbCA9PiBPYmplY3QuYXNzaWduKGZhY3RvcnkoZWwsIE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRzLCBvcHRzKSkpKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHsgaW5pdCB9OyIsImV4cG9ydCBjb25zdCBLRVlfQ09ERVMgPSB7XG4gICAgRU5URVI6IDEzXG59O1xuXG5leHBvcnQgY29uc3QgVFJJR0dFUl9FVkVOVFMgPSBbJ2NsaWNrJywgJ2tleWRvd24nIF07XG5cbmV4cG9ydCBjb25zdCBEQVRBX0FUVFJJQlVURVMgPSB7XG4gICAgSU5QVVRfSUQ6ICdkYXRhLWlucHV0LWlkJyxcbiAgICBBTFBIQV9JTlBVVDogJ2RhdGEtYWxwaGEtaW5wdXQnLFxuICAgIE5BTUVfQkFTRTogJ2RhdGEtaW5wdXQtbmFtZS1iYXNlJ1xufTsiLCJleHBvcnQgZGVmYXVsdCB7XG4gICAgZGVsZXRlQnV0dG9uOiB7IFxuICAgICAgICB0eXBlOiAnZGl2JyxcbiAgICAgICAgYXR0cmlidXRlczogeyByb2xlOiAnYnV0dG9uJywgY2xhc3M6ICdyZXBlYXRlcl9fZGVsZXRlJywgdGFiaW5kZXg6IDAgfSxcbiAgICAgICAgaW5uZXJIVE1MOiAnPHN2ZyBoZWlnaHQ9XCIyMFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiB3aWR0aD1cIjIwXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxwYXRoIGQ9XCJNMCAwaDI0djI0SDB6XCIgZmlsbD1cIm5vbmVcIi8+PHBhdGggZD1cIk0xNC41OSA4TDEyIDEwLjU5IDkuNDEgOCA4IDkuNDEgMTAuNTkgMTIgOCAxNC41OSA5LjQxIDE2IDEyIDEzLjQxIDE0LjU5IDE2IDE2IDE0LjU5IDEzLjQxIDEyIDE2IDkuNDEgMTQuNTkgOHpNMTIgMkM2LjQ3IDIgMiA2LjQ3IDIgMTJzNC40NyAxMCAxMCAxMCAxMC00LjQ3IDEwLTEwUzE3LjUzIDIgMTIgMnptMCAxOGMtNC40MSAwLTgtMy41OS04LThzMy41OS04IDgtOCA4IDMuNTkgOCA4LTMuNTkgOC04IDh6XCIvPjwvc3ZnPidcbiAgICB9LFxuICAgIGNvbnRhaW5lcjoge1xuICAgICAgICB0eXBlOiAnZGl2JyxcbiAgICAgICAgYXR0cmlidXRlczogeyBjbGFzczogJ3JlbGF0aXZlIHJlcGVhdGVyX19jb250YWluZXInIH0sIFxuICAgIH0sXG4gICAgbmFtZShuYW1lLCBpbmRleCl7IHJldHVybiBgJHtuYW1lfVske2luZGV4fV1gIH0sXG4gICAgaWQobmFtZSwgaW5kZXgpeyByZXR1cm4gYCR7bmFtZX1fJHtpbmRleH1fYDsgfVxufTsiLCJleHBvcnQgY29uc3QgaCA9IHZOb2RlID0+IHtcbiAgICBsZXQgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodk5vZGUudHlwZSk7XG4gICAgZm9yKGxldCBrZXkgaW4gdk5vZGUuYXR0cmlidXRlcykge1xuICAgICAgICBpZihrZXkuc3Vic3RyKDAsIDIpID09PSAnb24nKSBub2RlLmFkZEV2ZW50TGlzdGVuZXIoa2V5LnN1YnN0cigyKS50b0xvd2VyQ2FzZSgpLCB2Tm9kZS5hdHRyaWJ1dGVzW2tleV0pO1xuICAgICAgICBlbHNlIG5vZGUuc2V0QXR0cmlidXRlKGtleSwgdk5vZGUuYXR0cmlidXRlc1trZXldKTtcbiAgICB9XG4gICAgXG4gICAgaWYodk5vZGUudGV4dCkgbm9kZS5hcHBlbmRjaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh2Tm9kZS50ZXh0KSk7XG4gICAgaWYodk5vZGUuaW5uZXJIVE1MKSBub2RlLmlubmVySFRNTCA9IHZOb2RlLmlubmVySFRNTDtcbiAgICBcblxuICAgIHZOb2RlLmNoaWxkcmVuICYmIHZOb2RlLmNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICBpZihjaGlsZC5ub2RlTmFtZSkgbm9kZS5hcHBlbmRDaGlsZChjaGlsZCk7XG4gICAgICAgIGVsc2Ugbm9kZS5hcHBlbmRDaGlsZChoKGNoaWxkKSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbm9kZTtcbn07XG5cbmV4cG9ydCBjb25zdCB1cGRhdGVBdHRyaWJ1dGVzID0gKG5vZGUsIGF0dHJpYnV0ZXMpID0+IHtcbiAgICBmb3IobGV0IGtleSBpbiBhdHRyaWJ1dGVzKSBub2RlLnNldEF0dHJpYnV0ZShrZXksIGF0dHJpYnV0ZXNba2V5XSk7XG4gICAgcmV0dXJuIG5vZGU7XG59O1xuXG5leHBvcnQgY29uc3QgY2xvbmVzRnJvbURPTSA9IG5vZGVzID0+IG5vZGVzLm1hcChub2RlID0+ICh7XG4gICAgICAgIGNvbnRhaW5lcjogbm9kZSxcbiAgICAgICAgaW5wdXQ6IG5vZGUuZmlyc3RFbGVtZW50Q2hpbGQsXG4gICAgICAgIGJ1dHRvbjogbm9kZS5sYXN0RWxlbWVudENoaWxkXG4gICAgfSkpOyIsImltcG9ydCB7IEtFWV9DT0RFUywgVFJJR0dFUl9FVkVOVFMsIERBVEFfQVRUUklCVVRFUyB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCBDcmVhdGVTdG9yZSBmcm9tICcuL3N0b3JlJztcbmltcG9ydCBSZWR1Y2VycyBmcm9tICcuL3JlZHVjZXJzJztcbmltcG9ydCB7IGgsIHVwZGF0ZUF0dHJpYnV0ZXMsIGNsb25lc0Zyb21ET00gfSBmcm9tICcuL2RvbSc7XG5cbmNvbnN0IHJlbW92ZUlucHV0ID0gZnVuY3Rpb24oU3RvcmUpe1xuICAgIHJldHVybiBmdW5jdGlvbigpe1xuICAgICAgICBsZXQgY2xvbmUgPSBTdG9yZS5nZXRTdGF0ZSgpLmNsb25lcy5yZWR1Y2UoKGFjYywgY3VycikgPT4ge1xuICAgICAgICAgICAgaWYoY3Vyci5idXR0b24gPT09IHRoaXMpIGFjYyA9IGN1cnI7XG4gICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICB9LCBmYWxzZSk7XG4gICAgICAgIFN0b3JlLnVwZGF0ZShSZWR1Y2Vycy5kZWxldGVJbnB1dCwgY2xvbmUsIFtcbiAgICAgICAgICAgICgpID0+IHsgY2xvbmUuY29udGFpbmVyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoY2xvbmUuY29udGFpbmVyKTsgfSxcbiAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICBTdG9yZS5nZXRTdGF0ZSgpLmNsb25lcy5mb3JFYWNoKChjbG9uZSwgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVBdHRyaWJ1dGVzKGNsb25lLmlucHV0LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBTdG9yZS5nZXRTdGF0ZSgpLnNldHRpbmdzLm5hbWUoU3RvcmUuZ2V0U3RhdGUoKS5uYW1lLCBpICsgMSksXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogIFN0b3JlLmdldFN0YXRlKCkuc2V0dGluZ3MuaWQoU3RvcmUuZ2V0U3RhdGUoKS5uYW1lLCBpICsgMSlcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSk7XG4gICAgfTtcbn07XG5cbmNvbnN0IGFkZElucHV0ID0gU3RvcmUgPT4gKCkgPT4ge1xuICAgIGNvbnN0IG5vZGUgPSBoKE9iamVjdC5hc3NpZ24oe30sIFxuICAgICAgICAgICAgICAgICAgICBTdG9yZS5nZXRTdGF0ZSgpLnNldHRpbmdzLmNvbnRhaW5lcixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVBdHRyaWJ1dGVzKFN0b3JlLmdldFN0YXRlKCkuaW5wdXQuY2xvbmVOb2RlKHRydWUpLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFN0b3JlLmdldFN0YXRlKCkuc2V0dGluZ3MubmFtZShTdG9yZS5nZXRTdGF0ZSgpLm5hbWUsIFN0b3JlLmdldFN0YXRlKCkuY2xvbmVzLmxlbmd0aCArIDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogIFN0b3JlLmdldFN0YXRlKCkuc2V0dGluZ3MuaWQoU3RvcmUuZ2V0U3RhdGUoKS5uYW1lLCBTdG9yZS5nZXRTdGF0ZSgpLmNsb25lcy5sZW5ndGggKyAxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2FyaWEtbGFiZWwnOiBTdG9yZS5nZXRTdGF0ZSgpLmxhYmVsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaChPYmplY3QuYXNzaWduKHt9LCBTdG9yZS5nZXRTdGF0ZSgpLnNldHRpbmdzLmRlbGV0ZUJ1dHRvbiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiBPYmplY3QuYXNzaWduKHt9LCBTdG9yZS5nZXRTdGF0ZSgpLnNldHRpbmdzLmRlbGV0ZUJ1dHRvbi5hdHRyaWJ1dGVzLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbmNsaWNrOiByZW1vdmVJbnB1dChTdG9yZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbmtleXVwKGUpeyBpZighZS5rZXlDb2RlIHx8IGUua2V5Q29kZSA9PT0gS0VZX0NPREVTLkVOVEVSKSByZW1vdmVJbnB1dChTdG9yZSkuY2FsbCh0aGlzKTsgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICBTdG9yZS51cGRhdGUoUmVkdWNlcnMuYWRkSW5wdXQsIHtcbiAgICAgICAgY29udGFpbmVyOiBTdG9yZS5nZXRTdGF0ZSgpLmJ1dHRvbi5wYXJlbnROb2RlLmluc2VydEJlZm9yZShub2RlLCBTdG9yZS5nZXRTdGF0ZSgpLmJ1dHRvbiksXG4gICAgICAgIGlucHV0OiBub2RlLmZpcnN0RWxlbWVudENoaWxkLFxuICAgICAgICBidXR0b246IG5vZGUubGFzdEVsZW1lbnRDaGlsZFxuICAgIH0pO1xuXG4gICAgbm9kZS5maXJzdEVsZW1lbnRDaGlsZC5mb2N1cygpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgKG5vZGUsIHNldHRpbmdzKSA9PiB7XG4gICAgY29uc3QgU3RvcmUgPSBDcmVhdGVTdG9yZSgpO1xuICAgIFN0b3JlLnVwZGF0ZShSZWR1Y2Vycy5zZXRJbml0aWFsU3RhdGUsIHtcbiAgICAgICAgYnV0dG9uOiBub2RlLFxuICAgICAgICBzZXR0aW5ncyxcbiAgICAgICAgbGFiZWw6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtmb3I9XCIke25vZGUuZ2V0QXR0cmlidXRlKERBVEFfQVRUUklCVVRFUy5JTlBVVF9JRCl9XCJdYCkuaW5uZXJUZXh0IHx8ICcnLFxuICAgICAgICBpbnB1dDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobm9kZS5nZXRBdHRyaWJ1dGUoREFUQV9BVFRSSUJVVEVTLklOUFVUX0lEKSksXG4gICAgICAgIG5hbWU6IG5vZGUuZ2V0QXR0cmlidXRlKERBVEFfQVRUUklCVVRFUy5OQU1FX0JBU0UpLFxuICAgICAgICBjbG9uZXM6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWFscGhhLWlucHV0PVwiJHtub2RlLmdldEF0dHJpYnV0ZShEQVRBX0FUVFJJQlVURVMuSU5QVVRfSUQpfVwiXWApID8gY2xvbmVzRnJvbURPTShbXS5zbGljZS5jYWxsKCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS1hbHBoYS1pbnB1dD1cIiR7bm9kZS5nZXRBdHRyaWJ1dGUoREFUQV9BVFRSSUJVVEVTLklOUFVUX0lEKX1cIl1gKSkpIDogW11cbiAgICB9KTtcbiAgICBUUklHR0VSX0VWRU5UUy5mb3JFYWNoKGV2ID0+IHtcbiAgICAgICAgU3RvcmUuZ2V0U3RhdGUoKS5idXR0b24uYWRkRXZlbnRMaXN0ZW5lcihldiwgZSA9PiB7XG4gICAgICAgICAgICBpZighZS5rZXlDb2RlIHx8IGUua2V5Q29kZSA9PT0gS0VZX0NPREVTLkVOVEVSKSBhZGRJbnB1dChTdG9yZSkoKTtcbiAgICAgICAgfSlcbiAgICAgICAgaWYoU3RvcmUuZ2V0U3RhdGUoKS5jbG9uZXMubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICBTdG9yZS5nZXRTdGF0ZSgpLmNsb25lcy5mb3JFYWNoKGNsb25lID0+IHtcbiAgICAgICAgICAgICAgICBjbG9uZS5idXR0b24uYWRkRXZlbnRMaXN0ZW5lcihldiwgZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmKCFlLmtleUNvZGUgfHwgZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuRU5URVIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZUlucHV0KFN0b3JlKS5jYWxsKGNsb25lLmJ1dHRvbik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBcbiAgICByZXR1cm4ge1xuICAgICAgICBhZGRJbnB1dDogYWRkSW5wdXQoU3RvcmUpXG4gICAgfVxufTsiLCJleHBvcnQgZGVmYXVsdCB7XG4gICAgc2V0SW5pdGlhbFN0YXRlOiAoc3RhdGUsIGRhdGEpID0+IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCBkYXRhKSxcbiAgICBhZGRJbnB1dDogKHN0YXRlLCBkYXRhKSA9PiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBjbG9uZXM6IFsuLi5zdGF0ZS5jbG9uZXMsIGRhdGFdfSksXG4gICAgZGVsZXRlSW5wdXQ6IChzdGF0ZSwgZGF0YSkgPT4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgY2xvbmVzOiBzdGF0ZS5jbG9uZXMuZmlsdGVyKGNsb25lID0+IGNsb25lLmJ1dHRvbiAhPT0gZGF0YS5idXR0b24pfSlcbn07IiwiZXhwb3J0IGRlZmF1bHQgKCkgPT4gKHtcbiAgICBzdGF0ZToge1xuICAgICAgICBjbG9uZXM6IFtdXG4gICAgfSxcbiAgICB1cGRhdGUocmVkdWNlciwgbmV4dFN0YXRlLCBlZmZlY3RzID0gW10peyBcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHJlZHVjZXIodGhpcy5zdGF0ZSwgbmV4dFN0YXRlKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLnN0YXRlKTtcbiAgICAgICAgaWYoZWZmZWN0cy5sZW5ndGggPiAwKSBlZmZlY3RzLmZvckVhY2goZWZmZWN0ID0+IHsgZWZmZWN0KCkgfSk7XG4gICAgfSxcbiAgICBnZXRTdGF0ZSgpIHsgcmV0dXJuIHRoaXMuc3RhdGUgfVxufSk7Il19
