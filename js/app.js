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
		return Object.create((0, _lib2.default)(el, Object.assign({}, _defaults2.default, opts)));
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

var addInput = function addInput() {
    var remove = function remove() {
        var _this = this;

        //remove DOM node
        var clone = _store2.default.getState().clones.reduce(function (acc, curr) {
            if (curr.button === _this) acc = curr;
            return acc;
        }, false);
        _store2.default.update(_reducers2.default.deleteInput, clone, [function () {
            clone.container.parentNode.removeChild(clone.container);
        }, function () {
            _store2.default.getState().clones.forEach(function (clone, i) {
                (0, _dom.updateAttributes)(clone.input, {
                    name: _store2.default.getState().settings.name(_store2.default.getState().name, i + 1),
                    id: _store2.default.getState().settings.id(_store2.default.getState().name, i + 1)
                });
            });
        }]);
    },
        node = (0, _dom.h)(Object.assign({}, _store2.default.getState().settings.container, {
        children: [(0, _dom.updateAttributes)(_store2.default.getState().input.cloneNode(true), {
            name: _store2.default.getState().settings.name(_store2.default.getState().name, _store2.default.getState().clones.length + 1),
            id: _store2.default.getState().settings.id(_store2.default.getState().name, _store2.default.getState().clones.length + 1),
            'aria-label': _store2.default.getState().label
        }), (0, _dom.h)(Object.assign({}, _store2.default.getState().settings.deleteButton, {
            attributes: Object.assign({}, _store2.default.getState().settings.deleteButton.attributes, {
                onclick: remove,
                onkeyup: function onkeyup(e) {
                    if (!e.keyCode || e.keyCode === _constants.KEY_CODES.ENTER) remove.call(this);
                }
            })
        }))]
    }));

    _store2.default.update(_reducers2.default.addInput, {
        container: _store2.default.getState().button.parentNode.insertBefore(node, _store2.default.getState().button),
        input: node.firstElementChild,
        button: node.lastElementChild
    });

    node.firstElementChild.focus();
};

exports.default = function (node, settings) {
    //construct state from DOM on first load

    _store2.default.update(_reducers2.default.setInitialState, {
        button: node,
        settings: settings,
        label: document.querySelector('[for=' + node.getAttribute('data-input')).innerText,
        input: document.getElementById(node.getAttribute('data-input')),
        name: node.getAttribute('data-input-name')
    });

    _constants.TRIGGER_EVENTS.forEach(function (ev) {
        _store2.default.getState().button.addEventListener(ev, function (e) {
            if (!e.keyCode || e.keyCode === _constants.KEY_CODES.ENTER) addInput();
        });
    });

    return {
        addInput: addInput
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
exports.default = {
    state: {
        clones: []
    },
    update: function update(reducer, nextState) {
        var effects = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

        this.state = reducer(this.state, nextState);
        console.log(this.state);
        if (effects.length > 0) effects.forEach(function (effect) {
            effect();
        });
    },
    getState: function getState() {
        return this.state;
    }
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJleGFtcGxlL3NyYy9hcHAuanMiLCJleGFtcGxlL3NyYy9saWJzL2NvbXBvbmVudC9pbmRleC5qcyIsImV4YW1wbGUvc3JjL2xpYnMvY29tcG9uZW50L2xpYi9jb25zdGFudHMuanMiLCJleGFtcGxlL3NyYy9saWJzL2NvbXBvbmVudC9saWIvZGVmYXVsdHMuanMiLCJleGFtcGxlL3NyYy9saWJzL2NvbXBvbmVudC9saWIvZG9tLmpzIiwiZXhhbXBsZS9zcmMvbGlicy9jb21wb25lbnQvbGliL2luZGV4LmpzIiwiZXhhbXBsZS9zcmMvbGlicy9jb21wb25lbnQvbGliL3JlZHVjZXJzLmpzIiwiZXhhbXBsZS9zcmMvbGlicy9jb21wb25lbnQvbGliL3N0b3JlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7Ozs7Ozs7QUFFQSxJQUFNLDJCQUEyQixZQUFNLEFBQ25DO0FBQ0E7V0FBQSxBQUFPLGtCQUFrQixvQkFBQSxBQUFXLEtBQXBDLEFBQXlCLEFBQWdCLEFBQzVDO0FBSEQsQUFBZ0MsQ0FBQTs7QUFLaEMsQUFBRTs0QkFBQSxBQUF3QixRQUFRLFVBQUEsQUFBQyxJQUFEO2VBQUEsQUFBUTtBQUF4QyxBQUFnRDs7Ozs7Ozs7OztBQ1BsRDs7OztBQUNBOzs7Ozs7OztBQUVBLElBQU0sT0FBTyxTQUFQLEFBQU8sS0FBQSxBQUFDLEtBQUQsQUFBTSxNQUFTLEFBQzNCO0tBQUksTUFBTSxHQUFBLEFBQUcsTUFBSCxBQUFTLEtBQUssU0FBQSxBQUFTLGlCQUFqQyxBQUFVLEFBQWMsQUFBMEIsQUFFbEQ7O0tBQUcsQ0FBQyxJQUFKLEFBQVEsUUFBUSxPQUFPLFFBQUEsQUFBUSxLQUFmLEFBQU8sQUFBYSxBQUVwQzs7WUFBTyxBQUFJLElBQUksY0FBQTtTQUFNLE9BQUEsQUFBTyxPQUFPLG1CQUFBLEFBQVEsSUFBSSxPQUFBLEFBQU8sT0FBUCxBQUFjLHdCQUE5QyxB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QUFNQTs7O2tCQUFBLEFBQU8sQUFHVjtBQUhVLEFBQ0g7QTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7cUJDckVhLHlCQUFBLEFBQUMsT0FBRCxBQUFRLE1BQVI7ZUFBaUIsT0FBQSxBQUFPLE9BQVAsQUFBYyxJQUFkLEFBQWtCLE9BQW5DLEFBQWlCLEFBQXlCO0FBRGhELEFBRVg7Y0FBVSxrQkFBQSxBQUFDLE9BQUQsQUFBUSxNQUFSO2VBQWlCLE9BQUEsQUFBTyxPQUFQLEFBQWMsSUFBZCxBQUFrQixPQUFPLEVBQUUscUNBQVksTUFBWixBQUFrQixVQUE5RCxBQUFpQixBQUF5QixBQUFFLEFBQTBCO0FBRnJFLEFBR1g7aUJBQWEscUJBQUEsQUFBQyxPQUFELEFBQVEsTUFBUjtlQUFpQixPQUFBLEFBQU8sT0FBUCxBQUFjLElBQWQsQUFBa0IsU0FBUyxjQUFRLEFBQU0sT0FBTixBQUFhLE9BQU8saUJBQUE7dUJBQVMsTUFBQSxBQUFNLFdBQVcsS0FBMUIsQUFBK0I7QUFBdkcsQUFBaUIsQUFBeUIsQUFBVSxhQUFBLENBQVY7QSxBQUg1QztBQUFBLEFBQ1g7Ozs7Ozs7Ozs7Z0JDRFcsQUFDSixBQUNLLEFBRVo7QUFITyxBQUNIO0FBRk8sNEJBQUEsQUFJSixTQUpJLEFBSUssV0FBd0I7WUFBYixBQUFhLDhFQUFILEFBQUcsQUFDcEM7O2FBQUEsQUFBSyxRQUFRLFFBQVEsS0FBUixBQUFhLE9BQTFCLEFBQWEsQUFBb0IsQUFDakM7Z0JBQUEsQUFBUSxJQUFJLEtBQVosQUFBaUIsQUFDakI7WUFBRyxRQUFBLEFBQVEsU0FBWCxBQUFvQixXQUFHLEFBQVEsUUFBUSxrQkFBVSxBQUFFO0FBQVU7QUFBdEMsQUFDMUIsU0FEMEI7QUFQaEIsQUFTWDtBQVRXLGtDQVNBLEFBQUU7ZUFBTyxLQUFQLEFBQVksQUFBTztBLEFBVHJCO0FBQUEsQUFDWCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9cmV0dXJuIGV9KSgpIiwiaW1wb3J0IElucHV0Q2xvbmUgZnJvbSAnLi9saWJzL2NvbXBvbmVudCc7XG5cbmNvbnN0IG9uRE9NQ29udGVudExvYWRlZFRhc2tzID0gWygpID0+IHtcbiAgICAvLyBjb25zb2xlLmxvZyhpbnB1dENsb25lKTtcbiAgICB3aW5kb3cuX19JTlBVVF9DTE9ORV9fID0gSW5wdXRDbG9uZS5pbml0KCcuanMtaW5wdXRfX2Nsb25lJyk7XG59XTtcblxueyBvbkRPTUNvbnRlbnRMb2FkZWRUYXNrcy5mb3JFYWNoKChmbikgPT4gZm4oKSk7IH0iLCJpbXBvcnQgZGVmYXVsdHMgZnJvbSAnLi9saWIvZGVmYXVsdHMnO1xuaW1wb3J0IGZhY3RvcnkgZnJvbSAnLi9saWInO1xuXG5jb25zdCBpbml0ID0gKHNlbCwgb3B0cykgPT4ge1xuXHRsZXQgZWxzID0gW10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbCkpO1xuXG5cdGlmKCFlbHMubGVuZ3RoKSByZXR1cm4gY29uc29sZS53YXJuKCdObyBpbnB1dCBjbG9uZSBidXR0b25zIGZvdW5kJyk7XG4gICAgXG5cdHJldHVybiBlbHMubWFwKGVsID0+IE9iamVjdC5jcmVhdGUoZmFjdG9yeShlbCwgT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdHMsIG9wdHMpKSkpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgeyBpbml0IH07IiwiZXhwb3J0IGNvbnN0IEtFWV9DT0RFUyA9IHtcbiAgICBFTlRFUjogMTNcbn07XG5cbmV4cG9ydCBjb25zdCBUUklHR0VSX0VWRU5UUyA9IFsnY2xpY2snLCAna2V5ZG93bicgXTsiLCJleHBvcnQgZGVmYXVsdCB7XG4gICAgZGVsZXRlQnV0dG9uOiB7IFxuICAgICAgICB0eXBlOiAnZGl2JyxcbiAgICAgICAgYXR0cmlidXRlczogeyByb2xlOiAnYnV0dG9uJywgY2xhc3M6ICdyZXBlYXRlcl9fZGVsZXRlJywgdGFiaW5kZXg6IDAgfSxcbiAgICAgICAgaW5uZXJIVE1MOiAnPHN2ZyBoZWlnaHQ9XCIyMFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiB3aWR0aD1cIjIwXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxwYXRoIGQ9XCJNMCAwaDI0djI0SDB6XCIgZmlsbD1cIm5vbmVcIi8+PHBhdGggZD1cIk0xNC41OSA4TDEyIDEwLjU5IDkuNDEgOCA4IDkuNDEgMTAuNTkgMTIgOCAxNC41OSA5LjQxIDE2IDEyIDEzLjQxIDE0LjU5IDE2IDE2IDE0LjU5IDEzLjQxIDEyIDE2IDkuNDEgMTQuNTkgOHpNMTIgMkM2LjQ3IDIgMiA2LjQ3IDIgMTJzNC40NyAxMCAxMCAxMCAxMC00LjQ3IDEwLTEwUzE3LjUzIDIgMTIgMnptMCAxOGMtNC40MSAwLTgtMy41OS04LThzMy41OS04IDgtOCA4IDMuNTkgOCA4LTMuNTkgOC04IDh6XCIvPjwvc3ZnPidcbiAgICB9LFxuICAgIGNvbnRhaW5lcjoge1xuICAgICAgICB0eXBlOiAnZGl2JyxcbiAgICAgICAgYXR0cmlidXRlczogeyBjbGFzczogJ3JlbGF0aXZlIHJlcGVhdGVyX19jb250YWluZXInIH0sIFxuICAgIH0sXG4gICAgbmFtZShuYW1lLCBpbmRleCl7IHJldHVybiBgJHtuYW1lfVske2luZGV4fV1gIH0sXG4gICAgaWQobmFtZSwgaW5kZXgpeyByZXR1cm4gYCR7bmFtZX1fJHtpbmRleH1fYDsgfVxufTsiLCJleHBvcnQgY29uc3QgaCA9IHZOb2RlID0+IHtcbiAgICBsZXQgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodk5vZGUudHlwZSk7XG4gICAgZm9yKGxldCBrZXkgaW4gdk5vZGUuYXR0cmlidXRlcykge1xuICAgICAgICBpZihrZXkuc3Vic3RyKDAsIDIpID09PSAnb24nKSBub2RlLmFkZEV2ZW50TGlzdGVuZXIoa2V5LnN1YnN0cigyKS50b0xvd2VyQ2FzZSgpLCB2Tm9kZS5hdHRyaWJ1dGVzW2tleV0pO1xuICAgICAgICBlbHNlIG5vZGUuc2V0QXR0cmlidXRlKGtleSwgdk5vZGUuYXR0cmlidXRlc1trZXldKTtcbiAgICB9XG4gICAgXG4gICAgaWYodk5vZGUudGV4dCkgbm9kZS5hcHBlbmRjaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh2Tm9kZS50ZXh0KSk7XG4gICAgaWYodk5vZGUuaW5uZXJIVE1MKSBub2RlLmlubmVySFRNTCA9IHZOb2RlLmlubmVySFRNTDtcbiAgICBcblxuICAgIHZOb2RlLmNoaWxkcmVuICYmIHZOb2RlLmNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICBpZihjaGlsZC5ub2RlTmFtZSkgbm9kZS5hcHBlbmRDaGlsZChjaGlsZCk7XG4gICAgICAgIGVsc2Ugbm9kZS5hcHBlbmRDaGlsZChoKGNoaWxkKSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbm9kZTtcbn07XG5cbmV4cG9ydCBjb25zdCB1cGRhdGVBdHRyaWJ1dGVzID0gKG5vZGUsIGF0dHJpYnV0ZXMpID0+IHtcbiAgICBmb3IobGV0IGtleSBpbiBhdHRyaWJ1dGVzKSBub2RlLnNldEF0dHJpYnV0ZShrZXksIGF0dHJpYnV0ZXNba2V5XSk7XG4gICAgcmV0dXJuIG5vZGU7XG59OyIsImltcG9ydCB7IEtFWV9DT0RFUywgVFJJR0dFUl9FVkVOVFMgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgU3RvcmUgZnJvbSAnLi9zdG9yZSc7XG5pbXBvcnQgUmVkdWNlcnMgZnJvbSAnLi9yZWR1Y2Vycyc7XG5pbXBvcnQgeyBoLCB1cGRhdGVBdHRyaWJ1dGVzIH0gZnJvbSAnLi9kb20nO1xuXG5jb25zdCBhZGRJbnB1dCA9ICgpID0+IHtcbiAgICBjb25zdCByZW1vdmUgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgLy9yZW1vdmUgRE9NIG5vZGVcbiAgICAgICAgICAgIGxldCBjbG9uZSA9IFN0b3JlLmdldFN0YXRlKCkuY2xvbmVzLnJlZHVjZSgoYWNjLCBjdXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYoY3Vyci5idXR0b24gPT09IHRoaXMpIGFjYyA9IGN1cnI7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgICAgIFN0b3JlLnVwZGF0ZShSZWR1Y2Vycy5kZWxldGVJbnB1dCwgY2xvbmUsIFtcbiAgICAgICAgICAgICAgICAoKSA9PiB7IGNsb25lLmNvbnRhaW5lci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGNsb25lLmNvbnRhaW5lcik7IH0sXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBTdG9yZS5nZXRTdGF0ZSgpLmNsb25lcy5mb3JFYWNoKChjbG9uZSwgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlQXR0cmlidXRlcyhjbG9uZS5pbnB1dCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFN0b3JlLmdldFN0YXRlKCkuc2V0dGluZ3MubmFtZShTdG9yZS5nZXRTdGF0ZSgpLm5hbWUsIGkgKyAxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogIFN0b3JlLmdldFN0YXRlKCkuc2V0dGluZ3MuaWQoU3RvcmUuZ2V0U3RhdGUoKS5uYW1lLCBpICsgMSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9LFxuICAgICAgICBub2RlID0gaChPYmplY3QuYXNzaWduKHt9LCBcbiAgICAgICAgICAgICAgICAgICAgU3RvcmUuZ2V0U3RhdGUoKS5zZXR0aW5ncy5jb250YWluZXIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlQXR0cmlidXRlcyhTdG9yZS5nZXRTdGF0ZSgpLmlucHV0LmNsb25lTm9kZSh0cnVlKSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBTdG9yZS5nZXRTdGF0ZSgpLnNldHRpbmdzLm5hbWUoU3RvcmUuZ2V0U3RhdGUoKS5uYW1lLCBTdG9yZS5nZXRTdGF0ZSgpLmNsb25lcy5sZW5ndGggKyAxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICBTdG9yZS5nZXRTdGF0ZSgpLnNldHRpbmdzLmlkKFN0b3JlLmdldFN0YXRlKCkubmFtZSwgU3RvcmUuZ2V0U3RhdGUoKS5jbG9uZXMubGVuZ3RoICsgMSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdhcmlhLWxhYmVsJzogU3RvcmUuZ2V0U3RhdGUoKS5sYWJlbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGgoT2JqZWN0LmFzc2lnbih7fSwgU3RvcmUuZ2V0U3RhdGUoKS5zZXR0aW5ncy5kZWxldGVCdXR0b24sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlczogT2JqZWN0LmFzc2lnbih7fSwgU3RvcmUuZ2V0U3RhdGUoKS5zZXR0aW5ncy5kZWxldGVCdXR0b24uYXR0cmlidXRlcywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25jbGljazogcmVtb3ZlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25rZXl1cChlKXsgaWYoIWUua2V5Q29kZSB8fCBlLmtleUNvZGUgPT09IEtFWV9DT0RFUy5FTlRFUikgcmVtb3ZlLmNhbGwodGhpcyk7IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSlcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICApO1xuXG4gICAgU3RvcmUudXBkYXRlKFJlZHVjZXJzLmFkZElucHV0LCB7XG4gICAgICAgIGNvbnRhaW5lcjogU3RvcmUuZ2V0U3RhdGUoKS5idXR0b24ucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobm9kZSwgU3RvcmUuZ2V0U3RhdGUoKS5idXR0b24pLFxuICAgICAgICBpbnB1dDogbm9kZS5maXJzdEVsZW1lbnRDaGlsZCxcbiAgICAgICAgYnV0dG9uOiBub2RlLmxhc3RFbGVtZW50Q2hpbGRcbiAgICB9KTtcblxuICAgIG5vZGUuZmlyc3RFbGVtZW50Q2hpbGQuZm9jdXMoKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IChub2RlLCBzZXR0aW5ncykgPT4ge1xuICAgIC8vY29uc3RydWN0IHN0YXRlIGZyb20gRE9NIG9uIGZpcnN0IGxvYWRcblxuICAgIFN0b3JlLnVwZGF0ZShSZWR1Y2Vycy5zZXRJbml0aWFsU3RhdGUsIHtcbiAgICAgICAgYnV0dG9uOiBub2RlLFxuICAgICAgICBzZXR0aW5ncyxcbiAgICAgICAgbGFiZWw6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtmb3I9JHtub2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1pbnB1dCcpfWApLmlubmVyVGV4dCxcbiAgICAgICAgaW5wdXQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLWlucHV0JykpLFxuICAgICAgICBuYW1lOiBub2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1pbnB1dC1uYW1lJylcbiAgICB9KTtcblxuICAgIFRSSUdHRVJfRVZFTlRTLmZvckVhY2goZXYgPT4ge1xuICAgICAgICBTdG9yZS5nZXRTdGF0ZSgpLmJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKGV2LCBlID0+IHtcbiAgICAgICAgICAgIGlmKCFlLmtleUNvZGUgfHwgZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuRU5URVIpIGFkZElucHV0KCk7XG4gICAgICAgIH0pXG4gICAgfSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBhZGRJbnB1dFxuICAgIH1cbn07IiwiZXhwb3J0IGRlZmF1bHQge1xuICAgIHNldEluaXRpYWxTdGF0ZTogKHN0YXRlLCBkYXRhKSA9PiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgZGF0YSksXG4gICAgYWRkSW5wdXQ6IChzdGF0ZSwgZGF0YSkgPT4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgY2xvbmVzOiBbLi4uc3RhdGUuY2xvbmVzLCBkYXRhXX0pLFxuICAgIGRlbGV0ZUlucHV0OiAoc3RhdGUsIGRhdGEpID0+IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IGNsb25lczogc3RhdGUuY2xvbmVzLmZpbHRlcihjbG9uZSA9PiBjbG9uZS5idXR0b24gIT09IGRhdGEuYnV0dG9uKX0pXG59OyIsImV4cG9ydCBkZWZhdWx0IHtcbiAgICBzdGF0ZToge1xuICAgICAgICBjbG9uZXM6IFtdXG4gICAgfSxcbiAgICB1cGRhdGUocmVkdWNlciwgbmV4dFN0YXRlLCBlZmZlY3RzID0gW10peyBcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHJlZHVjZXIodGhpcy5zdGF0ZSwgbmV4dFN0YXRlKTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5zdGF0ZSk7XG4gICAgICAgIGlmKGVmZmVjdHMubGVuZ3RoID4gMCkgZWZmZWN0cy5mb3JFYWNoKGVmZmVjdCA9PiB7IGVmZmVjdCgpIH0pO1xuICAgIH0sXG4gICAgZ2V0U3RhdGUoKSB7IHJldHVybiB0aGlzLnN0YXRlIH1cbn07Il19
