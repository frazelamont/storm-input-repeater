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

var DATA_ATTRIBUTES = exports.DATA_ATTRIBUTES = {
    INPUT_ID: 'data-input-id',
    NAME_BASE: 'data-input-name-base'
};

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    serverRenderedSelector: '.js-input__clone-item',
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

var removeInput = function removeInput() {
    var _this = this;

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
};

var addInput = function addInput() {
    var node = (0, _dom.h)(Object.assign({}, _store2.default.getState().settings.container, {
        children: [(0, _dom.updateAttributes)(_store2.default.getState().input.cloneNode(true), {
            name: _store2.default.getState().settings.name(_store2.default.getState().name, _store2.default.getState().clones.length + 1),
            id: _store2.default.getState().settings.id(_store2.default.getState().name, _store2.default.getState().clones.length + 1),
            'aria-label': _store2.default.getState().label
        }), (0, _dom.h)(Object.assign({}, _store2.default.getState().settings.deleteButton, {
            attributes: Object.assign({}, _store2.default.getState().settings.deleteButton.attributes, {
                onclick: removeInput,
                onkeyup: function onkeyup(e) {
                    if (!e.keyCode || e.keyCode === _constants.KEY_CODES.ENTER) removeInput.call(this);
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
    _store2.default.update(_reducers2.default.setInitialState, {
        button: node,
        settings: settings,
        label: document.querySelector('[for="' + node.getAttribute(_constants.DATA_ATTRIBUTES.INPUT_ID) + '"]').innerText || '',
        input: document.getElementById(node.getAttribute(_constants.DATA_ATTRIBUTES.INPUT_ID)),
        name: node.getAttribute(_constants.DATA_ATTRIBUTES.NAME_BASE),
        clones: document.querySelector(settings.serverRenderedSelector) ? (0, _dom.clonesFromDOM)([].slice.call(document.querySelectorAll(settings.serverRenderedSelector))) : []
    });

    _constants.TRIGGER_EVENTS.forEach(function (ev) {
        _store2.default.getState().button.addEventListener(ev, function (e) {
            if (!e.keyCode || e.keyCode === _constants.KEY_CODES.ENTER) addInput();
        });
        if (_store2.default.getState().clones.length > 0) {
            _store2.default.getState().clones.forEach(function (clone) {
                clone.button.addEventListener(ev, function (e) {
                    if (!e.keyCode || e.keyCode === _constants.KEY_CODES.ENTER) removeInput.call(clone.button);
                });
            });
        }
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
        //console.log(this.state);
        if (effects.length > 0) effects.forEach(function (effect) {
            effect();
        });
    },
    getState: function getState() {
        return this.state;
    }
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJleGFtcGxlL3NyYy9hcHAuanMiLCJleGFtcGxlL3NyYy9saWJzL2NvbXBvbmVudC9pbmRleC5qcyIsImV4YW1wbGUvc3JjL2xpYnMvY29tcG9uZW50L2xpYi9jb25zdGFudHMuanMiLCJleGFtcGxlL3NyYy9saWJzL2NvbXBvbmVudC9saWIvZGVmYXVsdHMuanMiLCJleGFtcGxlL3NyYy9saWJzL2NvbXBvbmVudC9saWIvZG9tLmpzIiwiZXhhbXBsZS9zcmMvbGlicy9jb21wb25lbnQvbGliL2luZGV4LmpzIiwiZXhhbXBsZS9zcmMvbGlicy9jb21wb25lbnQvbGliL3JlZHVjZXJzLmpzIiwiZXhhbXBsZS9zcmMvbGlicy9jb21wb25lbnQvbGliL3N0b3JlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7Ozs7Ozs7QUFFQSxJQUFNLDJCQUEyQixZQUFNLEFBQ25DO0FBQ0E7V0FBQSxBQUFPLGtCQUFrQixvQkFBQSxBQUFXLEtBQXBDLEFBQXlCLEFBQWdCLEFBQzVDO0FBSEQsQUFBZ0MsQ0FBQTs7QUFLaEMsQUFBRTs0QkFBQSxBQUF3QixRQUFRLFVBQUEsQUFBQyxJQUFEO2VBQUEsQUFBUTtBQUF4QyxBQUFnRDs7Ozs7Ozs7OztBQ1BsRDs7OztBQUNBOzs7Ozs7OztBQUVBLElBQU0sT0FBTyxTQUFQLEFBQU8sS0FBQSxBQUFDLEtBQUQsQUFBTSxNQUFTLEFBQzNCO0tBQUksTUFBTSxHQUFBLEFBQUcsTUFBSCxBQUFTLEtBQUssU0FBQSxBQUFTLGlCQUFqQyxBQUFVLEFBQWMsQUFBMEIsQUFFbEQ7O0tBQUcsQ0FBQyxJQUFKLEFBQVEsUUFBUSxPQUFPLFFBQUEsQUFBUSxLQUFmLEFBQU8sQUFBYSxBQUVwQzs7WUFBTyxBQUFJLElBQUksY0FBQTtTQUFNLE9BQUEsQUFBTyxPQUFPLG1CQUFBLEFBQVEsSUFBSSxPQUFBLEFBQU8sT0FBUCxBQUFjLHdCQUE5QyxB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QUFZLE1BQVosQUFBa0IsVUFBOUQsQUFBaUIsQUFBeUIsQUFBRSxBQUEwQjtBQUZyRSxBQUdYO2lCQUFhLHFCQUFBLEFBQUMsT0FBRCxBQUFRLE1BQVI7ZUFBaUIsT0FBQSxBQUFPLE9BQVAsQUFBYyxJQUFkLEFBQWtCLFNBQVMsY0FBUSxBQUFNLE9BQU4sQUFBYSxPQUFPLGlCQUFBO3VCQUFTLE1BQUEsQUFBTSxXQUFXLEtBQTFCLEFBQStCO0FBQXZHLEFBQWlCLEFBQXlCLEFBQVUsYUFBQSxDQUFWO0EsQUFINUM7QUFBQSxBQUNYOzs7Ozs7Ozs7O2dCQ0RXLEFBQ0osQUFDSyxBQUVaO0FBSE8sQUFDSDtBQUZPLDRCQUFBLEFBSUosU0FKSSxBQUlLLFdBQXdCO1lBQWIsQUFBYSw4RUFBSCxBQUFHLEFBQ3BDOzthQUFBLEFBQUssUUFBUSxRQUFRLEtBQVIsQUFBYSxPQUExQixBQUFhLEFBQW9CLEFBQ2pDO0FBQ0E7WUFBRyxRQUFBLEFBQVEsU0FBWCxBQUFvQixXQUFHLEFBQVEsUUFBUSxrQkFBVSxBQUFFO0FBQVU7QUFBdEMsQUFDMUIsU0FEMEI7QUFQaEIsQUFTWDtBQVRXLGtDQVNBLEFBQUU7ZUFBTyxLQUFQLEFBQVksQUFBTztBLEFBVHJCO0FBQUEsQUFDWCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9cmV0dXJuIGV9KSgpIiwiaW1wb3J0IElucHV0Q2xvbmUgZnJvbSAnLi9saWJzL2NvbXBvbmVudCc7XG5cbmNvbnN0IG9uRE9NQ29udGVudExvYWRlZFRhc2tzID0gWygpID0+IHtcbiAgICAvLyBjb25zb2xlLmxvZyhpbnB1dENsb25lKTtcbiAgICB3aW5kb3cuX19JTlBVVF9DTE9ORV9fID0gSW5wdXRDbG9uZS5pbml0KCcuanMtaW5wdXRfX2Nsb25lJyk7XG59XTtcblxueyBvbkRPTUNvbnRlbnRMb2FkZWRUYXNrcy5mb3JFYWNoKChmbikgPT4gZm4oKSk7IH0iLCJpbXBvcnQgZGVmYXVsdHMgZnJvbSAnLi9saWIvZGVmYXVsdHMnO1xuaW1wb3J0IGZhY3RvcnkgZnJvbSAnLi9saWInO1xuXG5jb25zdCBpbml0ID0gKHNlbCwgb3B0cykgPT4ge1xuXHRsZXQgZWxzID0gW10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbCkpO1xuXG5cdGlmKCFlbHMubGVuZ3RoKSByZXR1cm4gY29uc29sZS53YXJuKCdObyBpbnB1dCBjbG9uZSBidXR0b25zIGZvdW5kJyk7XG4gICAgXG5cdHJldHVybiBlbHMubWFwKGVsID0+IE9iamVjdC5jcmVhdGUoZmFjdG9yeShlbCwgT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdHMsIG9wdHMpKSkpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgeyBpbml0IH07IiwiZXhwb3J0IGNvbnN0IEtFWV9DT0RFUyA9IHtcbiAgICBFTlRFUjogMTNcbn07XG5cbmV4cG9ydCBjb25zdCBUUklHR0VSX0VWRU5UUyA9IFsnY2xpY2snLCAna2V5ZG93bicgXTtcblxuZXhwb3J0IGNvbnN0IERBVEFfQVRUUklCVVRFUyA9IHtcbiAgICBJTlBVVF9JRDogJ2RhdGEtaW5wdXQtaWQnLFxuICAgIE5BTUVfQkFTRTogJ2RhdGEtaW5wdXQtbmFtZS1iYXNlJ1xufTsiLCJleHBvcnQgZGVmYXVsdCB7XG4gICAgc2VydmVyUmVuZGVyZWRTZWxlY3RvcjogJy5qcy1pbnB1dF9fY2xvbmUtaXRlbScsXG4gICAgZGVsZXRlQnV0dG9uOiB7IFxuICAgICAgICB0eXBlOiAnZGl2JyxcbiAgICAgICAgYXR0cmlidXRlczogeyByb2xlOiAnYnV0dG9uJywgY2xhc3M6ICdyZXBlYXRlcl9fZGVsZXRlJywgdGFiaW5kZXg6IDAgfSxcbiAgICAgICAgaW5uZXJIVE1MOiAnPHN2ZyBoZWlnaHQ9XCIyMFwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiB3aWR0aD1cIjIwXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxwYXRoIGQ9XCJNMCAwaDI0djI0SDB6XCIgZmlsbD1cIm5vbmVcIi8+PHBhdGggZD1cIk0xNC41OSA4TDEyIDEwLjU5IDkuNDEgOCA4IDkuNDEgMTAuNTkgMTIgOCAxNC41OSA5LjQxIDE2IDEyIDEzLjQxIDE0LjU5IDE2IDE2IDE0LjU5IDEzLjQxIDEyIDE2IDkuNDEgMTQuNTkgOHpNMTIgMkM2LjQ3IDIgMiA2LjQ3IDIgMTJzNC40NyAxMCAxMCAxMCAxMC00LjQ3IDEwLTEwUzE3LjUzIDIgMTIgMnptMCAxOGMtNC40MSAwLTgtMy41OS04LThzMy41OS04IDgtOCA4IDMuNTkgOCA4LTMuNTkgOC04IDh6XCIvPjwvc3ZnPidcbiAgICB9LFxuICAgIGNvbnRhaW5lcjoge1xuICAgICAgICB0eXBlOiAnZGl2JyxcbiAgICAgICAgYXR0cmlidXRlczogeyBjbGFzczogJ3JlbGF0aXZlIHJlcGVhdGVyX19jb250YWluZXInIH0sIFxuICAgIH0sXG4gICAgbmFtZShuYW1lLCBpbmRleCl7IHJldHVybiBgJHtuYW1lfVske2luZGV4fV1gIH0sXG4gICAgaWQobmFtZSwgaW5kZXgpeyByZXR1cm4gYCR7bmFtZX1fJHtpbmRleH1fYDsgfVxufTsiLCJleHBvcnQgY29uc3QgaCA9IHZOb2RlID0+IHtcbiAgICBsZXQgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodk5vZGUudHlwZSk7XG4gICAgZm9yKGxldCBrZXkgaW4gdk5vZGUuYXR0cmlidXRlcykge1xuICAgICAgICBpZihrZXkuc3Vic3RyKDAsIDIpID09PSAnb24nKSBub2RlLmFkZEV2ZW50TGlzdGVuZXIoa2V5LnN1YnN0cigyKS50b0xvd2VyQ2FzZSgpLCB2Tm9kZS5hdHRyaWJ1dGVzW2tleV0pO1xuICAgICAgICBlbHNlIG5vZGUuc2V0QXR0cmlidXRlKGtleSwgdk5vZGUuYXR0cmlidXRlc1trZXldKTtcbiAgICB9XG4gICAgXG4gICAgaWYodk5vZGUudGV4dCkgbm9kZS5hcHBlbmRjaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh2Tm9kZS50ZXh0KSk7XG4gICAgaWYodk5vZGUuaW5uZXJIVE1MKSBub2RlLmlubmVySFRNTCA9IHZOb2RlLmlubmVySFRNTDtcbiAgICBcblxuICAgIHZOb2RlLmNoaWxkcmVuICYmIHZOb2RlLmNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICBpZihjaGlsZC5ub2RlTmFtZSkgbm9kZS5hcHBlbmRDaGlsZChjaGlsZCk7XG4gICAgICAgIGVsc2Ugbm9kZS5hcHBlbmRDaGlsZChoKGNoaWxkKSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbm9kZTtcbn07XG5cbmV4cG9ydCBjb25zdCB1cGRhdGVBdHRyaWJ1dGVzID0gKG5vZGUsIGF0dHJpYnV0ZXMpID0+IHtcbiAgICBmb3IobGV0IGtleSBpbiBhdHRyaWJ1dGVzKSBub2RlLnNldEF0dHJpYnV0ZShrZXksIGF0dHJpYnV0ZXNba2V5XSk7XG4gICAgcmV0dXJuIG5vZGU7XG59O1xuXG5leHBvcnQgY29uc3QgY2xvbmVzRnJvbURPTSA9IG5vZGVzID0+IG5vZGVzLm1hcChub2RlID0+ICh7XG4gICAgICAgIGNvbnRhaW5lcjogbm9kZSxcbiAgICAgICAgaW5wdXQ6IG5vZGUuZmlyc3RFbGVtZW50Q2hpbGQsXG4gICAgICAgIGJ1dHRvbjogbm9kZS5sYXN0RWxlbWVudENoaWxkXG4gICAgfSkpOyIsImltcG9ydCB7IEtFWV9DT0RFUywgVFJJR0dFUl9FVkVOVFMsIERBVEFfQVRUUklCVVRFUyB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCBTdG9yZSBmcm9tICcuL3N0b3JlJztcbmltcG9ydCBSZWR1Y2VycyBmcm9tICcuL3JlZHVjZXJzJztcbmltcG9ydCB7IGgsIHVwZGF0ZUF0dHJpYnV0ZXMsIGNsb25lc0Zyb21ET00gfSBmcm9tICcuL2RvbSc7XG5cbmNvbnN0IHJlbW92ZUlucHV0ID0gZnVuY3Rpb24oKXtcbiAgICBsZXQgY2xvbmUgPSBTdG9yZS5nZXRTdGF0ZSgpLmNsb25lcy5yZWR1Y2UoKGFjYywgY3VycikgPT4ge1xuICAgICAgICBpZihjdXJyLmJ1dHRvbiA9PT0gdGhpcykgYWNjID0gY3VycjtcbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCBmYWxzZSk7XG5cbiAgICBTdG9yZS51cGRhdGUoUmVkdWNlcnMuZGVsZXRlSW5wdXQsIGNsb25lLCBbXG4gICAgICAgICgpID0+IHsgY2xvbmUuY29udGFpbmVyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoY2xvbmUuY29udGFpbmVyKTsgfSxcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgU3RvcmUuZ2V0U3RhdGUoKS5jbG9uZXMuZm9yRWFjaCgoY2xvbmUsIGkpID0+IHtcbiAgICAgICAgICAgICAgICB1cGRhdGVBdHRyaWJ1dGVzKGNsb25lLmlucHV0LCB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFN0b3JlLmdldFN0YXRlKCkuc2V0dGluZ3MubmFtZShTdG9yZS5nZXRTdGF0ZSgpLm5hbWUsIGkgKyAxKSxcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICBTdG9yZS5nZXRTdGF0ZSgpLnNldHRpbmdzLmlkKFN0b3JlLmdldFN0YXRlKCkubmFtZSwgaSArIDEpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgXSk7XG59O1xuXG5jb25zdCBhZGRJbnB1dCA9ICgpID0+IHtcbiAgICBjb25zdCBub2RlID0gaChPYmplY3QuYXNzaWduKHt9LCBcbiAgICAgICAgICAgICAgICAgICAgU3RvcmUuZ2V0U3RhdGUoKS5zZXR0aW5ncy5jb250YWluZXIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlQXR0cmlidXRlcyhTdG9yZS5nZXRTdGF0ZSgpLmlucHV0LmNsb25lTm9kZSh0cnVlKSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBTdG9yZS5nZXRTdGF0ZSgpLnNldHRpbmdzLm5hbWUoU3RvcmUuZ2V0U3RhdGUoKS5uYW1lLCBTdG9yZS5nZXRTdGF0ZSgpLmNsb25lcy5sZW5ndGggKyAxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICBTdG9yZS5nZXRTdGF0ZSgpLnNldHRpbmdzLmlkKFN0b3JlLmdldFN0YXRlKCkubmFtZSwgU3RvcmUuZ2V0U3RhdGUoKS5jbG9uZXMubGVuZ3RoICsgMSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdhcmlhLWxhYmVsJzogU3RvcmUuZ2V0U3RhdGUoKS5sYWJlbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGgoT2JqZWN0LmFzc2lnbih7fSwgU3RvcmUuZ2V0U3RhdGUoKS5zZXR0aW5ncy5kZWxldGVCdXR0b24sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlczogT2JqZWN0LmFzc2lnbih7fSwgU3RvcmUuZ2V0U3RhdGUoKS5zZXR0aW5ncy5kZWxldGVCdXR0b24uYXR0cmlidXRlcywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25jbGljazogcmVtb3ZlSW5wdXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbmtleXVwKGUpeyBpZighZS5rZXlDb2RlIHx8IGUua2V5Q29kZSA9PT0gS0VZX0NPREVTLkVOVEVSKSByZW1vdmVJbnB1dC5jYWxsKHRoaXMpOyB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgKTtcblxuICAgIFN0b3JlLnVwZGF0ZShSZWR1Y2Vycy5hZGRJbnB1dCwge1xuICAgICAgICBjb250YWluZXI6IFN0b3JlLmdldFN0YXRlKCkuYnV0dG9uLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG5vZGUsIFN0b3JlLmdldFN0YXRlKCkuYnV0dG9uKSxcbiAgICAgICAgaW5wdXQ6IG5vZGUuZmlyc3RFbGVtZW50Q2hpbGQsXG4gICAgICAgIGJ1dHRvbjogbm9kZS5sYXN0RWxlbWVudENoaWxkXG4gICAgfSk7XG5cbiAgICBub2RlLmZpcnN0RWxlbWVudENoaWxkLmZvY3VzKCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCAobm9kZSwgc2V0dGluZ3MpID0+IHtcbiAgICBTdG9yZS51cGRhdGUoUmVkdWNlcnMuc2V0SW5pdGlhbFN0YXRlLCB7XG4gICAgICAgIGJ1dHRvbjogbm9kZSxcbiAgICAgICAgc2V0dGluZ3MsXG4gICAgICAgIGxhYmVsOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZm9yPVwiJHtub2RlLmdldEF0dHJpYnV0ZShEQVRBX0FUVFJJQlVURVMuSU5QVVRfSUQpfVwiXWApLmlubmVyVGV4dCB8fCAnJyxcbiAgICAgICAgaW5wdXQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG5vZGUuZ2V0QXR0cmlidXRlKERBVEFfQVRUUklCVVRFUy5JTlBVVF9JRCkpLFxuICAgICAgICBuYW1lOiBub2RlLmdldEF0dHJpYnV0ZShEQVRBX0FUVFJJQlVURVMuTkFNRV9CQVNFKSxcbiAgICAgICAgY2xvbmVzOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNldHRpbmdzLnNlcnZlclJlbmRlcmVkU2VsZWN0b3IpID8gY2xvbmVzRnJvbURPTShbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2V0dGluZ3Muc2VydmVyUmVuZGVyZWRTZWxlY3RvcikpKSA6IFtdXG4gICAgfSk7XG5cbiAgICBUUklHR0VSX0VWRU5UUy5mb3JFYWNoKGV2ID0+IHtcbiAgICAgICAgU3RvcmUuZ2V0U3RhdGUoKS5idXR0b24uYWRkRXZlbnRMaXN0ZW5lcihldiwgZSA9PiB7XG4gICAgICAgICAgICBpZighZS5rZXlDb2RlIHx8IGUua2V5Q29kZSA9PT0gS0VZX0NPREVTLkVOVEVSKSBhZGRJbnB1dCgpO1xuICAgICAgICB9KVxuICAgICAgICBpZihTdG9yZS5nZXRTdGF0ZSgpLmNsb25lcy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgIFN0b3JlLmdldFN0YXRlKCkuY2xvbmVzLmZvckVhY2goY2xvbmUgPT4ge1xuICAgICAgICAgICAgICAgIGNsb25lLmJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKGV2LCBlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYoIWUua2V5Q29kZSB8fCBlLmtleUNvZGUgPT09IEtFWV9DT0RFUy5FTlRFUikgcmVtb3ZlSW5wdXQuY2FsbChjbG9uZS5idXR0b24pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIFxuICAgIHJldHVybiB7XG4gICAgICAgIGFkZElucHV0XG4gICAgfVxufTsiLCJleHBvcnQgZGVmYXVsdCB7XG4gICAgc2V0SW5pdGlhbFN0YXRlOiAoc3RhdGUsIGRhdGEpID0+IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCBkYXRhKSxcbiAgICBhZGRJbnB1dDogKHN0YXRlLCBkYXRhKSA9PiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBjbG9uZXM6IFsuLi5zdGF0ZS5jbG9uZXMsIGRhdGFdfSksXG4gICAgZGVsZXRlSW5wdXQ6IChzdGF0ZSwgZGF0YSkgPT4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgY2xvbmVzOiBzdGF0ZS5jbG9uZXMuZmlsdGVyKGNsb25lID0+IGNsb25lLmJ1dHRvbiAhPT0gZGF0YS5idXR0b24pfSlcbn07IiwiZXhwb3J0IGRlZmF1bHQge1xuICAgIHN0YXRlOiB7XG4gICAgICAgIGNsb25lczogW11cbiAgICB9LFxuICAgIHVwZGF0ZShyZWR1Y2VyLCBuZXh0U3RhdGUsIGVmZmVjdHMgPSBbXSl7IFxuICAgICAgICB0aGlzLnN0YXRlID0gcmVkdWNlcih0aGlzLnN0YXRlLCBuZXh0U3RhdGUpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMuc3RhdGUpO1xuICAgICAgICBpZihlZmZlY3RzLmxlbmd0aCA+IDApIGVmZmVjdHMuZm9yRWFjaChlZmZlY3QgPT4geyBlZmZlY3QoKSB9KTtcbiAgICB9LFxuICAgIGdldFN0YXRlKCkgeyByZXR1cm4gdGhpcy5zdGF0ZSB9XG59OyJdfQ==
