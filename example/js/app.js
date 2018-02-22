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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJleGFtcGxlL3NyYy9hcHAuanMiLCJleGFtcGxlL3NyYy9saWJzL2NvbXBvbmVudC9pbmRleC5qcyIsImV4YW1wbGUvc3JjL2xpYnMvY29tcG9uZW50L2xpYi9jb25zdGFudHMuanMiLCJleGFtcGxlL3NyYy9saWJzL2NvbXBvbmVudC9saWIvZGVmYXVsdHMuanMiLCJleGFtcGxlL3NyYy9saWJzL2NvbXBvbmVudC9saWIvZG9tLmpzIiwiZXhhbXBsZS9zcmMvbGlicy9jb21wb25lbnQvbGliL2luZGV4LmpzIiwiZXhhbXBsZS9zcmMvbGlicy9jb21wb25lbnQvbGliL3JlZHVjZXJzLmpzIiwiZXhhbXBsZS9zcmMvbGlicy9jb21wb25lbnQvbGliL3N0b3JlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7Ozs7Ozs7QUFFQSxJQUFNLDJCQUEyQixZQUFNLEFBQ25DO0FBQ0E7V0FBQSxBQUFPLGtCQUFrQixvQkFBQSxBQUFXLEtBQXBDLEFBQXlCLEFBQWdCLEFBQzVDO0FBSEQsQUFBZ0MsQ0FBQTs7QUFLaEMsQUFBRTs0QkFBQSxBQUF3QixRQUFRLFVBQUEsQUFBQyxJQUFEO2VBQUEsQUFBUTtBQUF4QyxBQUFnRDs7Ozs7Ozs7OztBQ1BsRDs7OztBQUNBOzs7Ozs7OztBQUVBLElBQU0sT0FBTyxTQUFQLEFBQU8sS0FBQSxBQUFDLEtBQUQsQUFBTSxNQUFTLEFBQzNCO0tBQUksTUFBTSxHQUFBLEFBQUcsTUFBSCxBQUFTLEtBQUssU0FBQSxBQUFTLGlCQUFqQyxBQUFVLEFBQWMsQUFBMEIsQUFFbEQ7O0tBQUcsQ0FBQyxJQUFKLEFBQVEsUUFBUSxPQUFPLFFBQUEsQUFBUSxLQUFmLEFBQU8sQUFBYSxBQUVwQzs7WUFBTyxBQUFJLElBQUksY0FBQTtTQUFNLE9BQUEsQUFBTyxPQUFPLG1CQUFBLEFBQVEsSUFBSSxPQUFBLEFBQU8sT0FBUCxBQUFjLHdCQUE5QyxB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QUFZLE1BQVosQUFBa0IsVUFBOUQsQUFBaUIsQUFBeUIsQUFBRSxBQUEwQjtBQUZyRSxBQUdYO2lCQUFhLHFCQUFBLEFBQUMsT0FBRCxBQUFRLE1BQVI7ZUFBaUIsT0FBQSxBQUFPLE9BQVAsQUFBYyxJQUFkLEFBQWtCLFNBQVMsY0FBUSxBQUFNLE9BQU4sQUFBYSxPQUFPLGlCQUFBO3VCQUFTLE1BQUEsQUFBTSxXQUFXLEtBQTFCLEFBQStCO0FBQXZHLEFBQWlCLEFBQXlCLEFBQVUsYUFBQSxDQUFWO0EsQUFINUM7QUFBQSxBQUNYOzs7Ozs7Ozs7O2dCQ0RXLEFBQ0osQUFDSyxBQUVaO0FBSE8sQUFDSDtBQUZPLDRCQUFBLEFBSUosU0FKSSxBQUlLLFdBQXdCO1lBQWIsQUFBYSw4RUFBSCxBQUFHLEFBQ3BDOzthQUFBLEFBQUssUUFBUSxRQUFRLEtBQVIsQUFBYSxPQUExQixBQUFhLEFBQW9CLEFBQ2pDO2dCQUFBLEFBQVEsSUFBSSxLQUFaLEFBQWlCLEFBQ2pCO1lBQUcsUUFBQSxBQUFRLFNBQVgsQUFBb0IsV0FBRyxBQUFRLFFBQVEsa0JBQVUsQUFBRTtBQUFVO0FBQXRDLEFBQzFCLFNBRDBCO0FBUGhCLEFBU1g7QUFUVyxrQ0FTQSxBQUFFO2VBQU8sS0FBUCxBQUFZLEFBQU87QSxBQVRyQjtBQUFBLEFBQ1giLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfXJldHVybiBlfSkoKSIsImltcG9ydCBJbnB1dENsb25lIGZyb20gJy4vbGlicy9jb21wb25lbnQnO1xuXG5jb25zdCBvbkRPTUNvbnRlbnRMb2FkZWRUYXNrcyA9IFsoKSA9PiB7XG4gICAgLy8gY29uc29sZS5sb2coaW5wdXRDbG9uZSk7XG4gICAgd2luZG93Ll9fSU5QVVRfQ0xPTkVfXyA9IElucHV0Q2xvbmUuaW5pdCgnLmpzLWlucHV0X19jbG9uZScpO1xufV07XG5cbnsgb25ET01Db250ZW50TG9hZGVkVGFza3MuZm9yRWFjaCgoZm4pID0+IGZuKCkpOyB9IiwiaW1wb3J0IGRlZmF1bHRzIGZyb20gJy4vbGliL2RlZmF1bHRzJztcbmltcG9ydCBmYWN0b3J5IGZyb20gJy4vbGliJztcblxuY29uc3QgaW5pdCA9IChzZWwsIG9wdHMpID0+IHtcblx0bGV0IGVscyA9IFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWwpKTtcblxuXHRpZighZWxzLmxlbmd0aCkgcmV0dXJuIGNvbnNvbGUud2FybignTm8gaW5wdXQgY2xvbmUgYnV0dG9ucyBmb3VuZCcpO1xuICAgIFxuXHRyZXR1cm4gZWxzLm1hcChlbCA9PiBPYmplY3QuY3JlYXRlKGZhY3RvcnkoZWwsIE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRzLCBvcHRzKSkpKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHsgaW5pdCB9OyIsImV4cG9ydCBjb25zdCBLRVlfQ09ERVMgPSB7XG4gICAgRU5URVI6IDEzXG59O1xuXG5leHBvcnQgY29uc3QgVFJJR0dFUl9FVkVOVFMgPSBbJ2NsaWNrJywgJ2tleWRvd24nIF07XG5cbmV4cG9ydCBjb25zdCBEQVRBX0FUVFJJQlVURVMgPSB7XG4gICAgSU5QVVRfSUQ6ICdkYXRhLWlucHV0LWlkJyxcbiAgICBOQU1FX0JBU0U6ICdkYXRhLWlucHV0LW5hbWUtYmFzZSdcbn07IiwiZXhwb3J0IGRlZmF1bHQge1xuICAgIHNlcnZlclJlbmRlcmVkU2VsZWN0b3I6ICcuanMtaW5wdXRfX2Nsb25lLWl0ZW0nLFxuICAgIGRlbGV0ZUJ1dHRvbjogeyBcbiAgICAgICAgdHlwZTogJ2RpdicsXG4gICAgICAgIGF0dHJpYnV0ZXM6IHsgcm9sZTogJ2J1dHRvbicsIGNsYXNzOiAncmVwZWF0ZXJfX2RlbGV0ZScsIHRhYmluZGV4OiAwIH0sXG4gICAgICAgIGlubmVySFRNTDogJzxzdmcgaGVpZ2h0PVwiMjBcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgd2lkdGg9XCIyMFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj48cGF0aCBkPVwiTTAgMGgyNHYyNEgwelwiIGZpbGw9XCJub25lXCIvPjxwYXRoIGQ9XCJNMTQuNTkgOEwxMiAxMC41OSA5LjQxIDggOCA5LjQxIDEwLjU5IDEyIDggMTQuNTkgOS40MSAxNiAxMiAxMy40MSAxNC41OSAxNiAxNiAxNC41OSAxMy40MSAxMiAxNiA5LjQxIDE0LjU5IDh6TTEyIDJDNi40NyAyIDIgNi40NyAyIDEyczQuNDcgMTAgMTAgMTAgMTAtNC40NyAxMC0xMFMxNy41MyAyIDEyIDJ6bTAgMThjLTQuNDEgMC04LTMuNTktOC04czMuNTktOCA4LTggOCAzLjU5IDggOC0zLjU5IDgtOCA4elwiLz48L3N2Zz4nXG4gICAgfSxcbiAgICBjb250YWluZXI6IHtcbiAgICAgICAgdHlwZTogJ2RpdicsXG4gICAgICAgIGF0dHJpYnV0ZXM6IHsgY2xhc3M6ICdyZWxhdGl2ZSByZXBlYXRlcl9fY29udGFpbmVyJyB9LCBcbiAgICB9LFxuICAgIG5hbWUobmFtZSwgaW5kZXgpeyByZXR1cm4gYCR7bmFtZX1bJHtpbmRleH1dYCB9LFxuICAgIGlkKG5hbWUsIGluZGV4KXsgcmV0dXJuIGAke25hbWV9XyR7aW5kZXh9X2A7IH1cbn07IiwiZXhwb3J0IGNvbnN0IGggPSB2Tm9kZSA9PiB7XG4gICAgbGV0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHZOb2RlLnR5cGUpO1xuICAgIGZvcihsZXQga2V5IGluIHZOb2RlLmF0dHJpYnV0ZXMpIHtcbiAgICAgICAgaWYoa2V5LnN1YnN0cigwLCAyKSA9PT0gJ29uJykgbm9kZS5hZGRFdmVudExpc3RlbmVyKGtleS5zdWJzdHIoMikudG9Mb3dlckNhc2UoKSwgdk5vZGUuYXR0cmlidXRlc1trZXldKTtcbiAgICAgICAgZWxzZSBub2RlLnNldEF0dHJpYnV0ZShrZXksIHZOb2RlLmF0dHJpYnV0ZXNba2V5XSk7XG4gICAgfVxuICAgIFxuICAgIGlmKHZOb2RlLnRleHQpIG5vZGUuYXBwZW5kY2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodk5vZGUudGV4dCkpO1xuICAgIGlmKHZOb2RlLmlubmVySFRNTCkgbm9kZS5pbm5lckhUTUwgPSB2Tm9kZS5pbm5lckhUTUw7XG4gICAgXG5cbiAgICB2Tm9kZS5jaGlsZHJlbiAmJiB2Tm9kZS5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgICAgaWYoY2hpbGQubm9kZU5hbWUpIG5vZGUuYXBwZW5kQ2hpbGQoY2hpbGQpO1xuICAgICAgICBlbHNlIG5vZGUuYXBwZW5kQ2hpbGQoaChjaGlsZCkpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG5vZGU7XG59O1xuXG5leHBvcnQgY29uc3QgdXBkYXRlQXR0cmlidXRlcyA9IChub2RlLCBhdHRyaWJ1dGVzKSA9PiB7XG4gICAgZm9yKGxldCBrZXkgaW4gYXR0cmlidXRlcykgbm9kZS5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyaWJ1dGVzW2tleV0pO1xuICAgIHJldHVybiBub2RlO1xufTtcblxuZXhwb3J0IGNvbnN0IGNsb25lc0Zyb21ET00gPSBub2RlcyA9PiBub2Rlcy5tYXAobm9kZSA9PiAoe1xuICAgICAgICBjb250YWluZXI6IG5vZGUsXG4gICAgICAgIGlucHV0OiBub2RlLmZpcnN0RWxlbWVudENoaWxkLFxuICAgICAgICBidXR0b246IG5vZGUubGFzdEVsZW1lbnRDaGlsZFxuICAgIH0pKTsiLCJpbXBvcnQgeyBLRVlfQ09ERVMsIFRSSUdHRVJfRVZFTlRTLCBEQVRBX0FUVFJJQlVURVMgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgU3RvcmUgZnJvbSAnLi9zdG9yZSc7XG5pbXBvcnQgUmVkdWNlcnMgZnJvbSAnLi9yZWR1Y2Vycyc7XG5pbXBvcnQgeyBoLCB1cGRhdGVBdHRyaWJ1dGVzLCBjbG9uZXNGcm9tRE9NIH0gZnJvbSAnLi9kb20nO1xuXG5jb25zdCByZW1vdmVJbnB1dCA9IGZ1bmN0aW9uKCl7XG4gICAgbGV0IGNsb25lID0gU3RvcmUuZ2V0U3RhdGUoKS5jbG9uZXMucmVkdWNlKChhY2MsIGN1cnIpID0+IHtcbiAgICAgICAgaWYoY3Vyci5idXR0b24gPT09IHRoaXMpIGFjYyA9IGN1cnI7XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgfSwgZmFsc2UpO1xuXG4gICAgU3RvcmUudXBkYXRlKFJlZHVjZXJzLmRlbGV0ZUlucHV0LCBjbG9uZSwgW1xuICAgICAgICAoKSA9PiB7IGNsb25lLmNvbnRhaW5lci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGNsb25lLmNvbnRhaW5lcik7IH0sXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICAgIFN0b3JlLmdldFN0YXRlKCkuY2xvbmVzLmZvckVhY2goKGNsb25lLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgdXBkYXRlQXR0cmlidXRlcyhjbG9uZS5pbnB1dCwge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBTdG9yZS5nZXRTdGF0ZSgpLnNldHRpbmdzLm5hbWUoU3RvcmUuZ2V0U3RhdGUoKS5uYW1lLCBpICsgMSksXG4gICAgICAgICAgICAgICAgICAgIGlkOiAgU3RvcmUuZ2V0U3RhdGUoKS5zZXR0aW5ncy5pZChTdG9yZS5nZXRTdGF0ZSgpLm5hbWUsIGkgKyAxKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIF0pO1xufTtcblxuY29uc3QgYWRkSW5wdXQgPSAoKSA9PiB7XG4gICAgY29uc3Qgbm9kZSA9IGgoT2JqZWN0LmFzc2lnbih7fSwgXG4gICAgICAgICAgICAgICAgICAgIFN0b3JlLmdldFN0YXRlKCkuc2V0dGluZ3MuY29udGFpbmVyLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZUF0dHJpYnV0ZXMoU3RvcmUuZ2V0U3RhdGUoKS5pbnB1dC5jbG9uZU5vZGUodHJ1ZSksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogU3RvcmUuZ2V0U3RhdGUoKS5zZXR0aW5ncy5uYW1lKFN0b3JlLmdldFN0YXRlKCkubmFtZSwgU3RvcmUuZ2V0U3RhdGUoKS5jbG9uZXMubGVuZ3RoICsgMSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAgU3RvcmUuZ2V0U3RhdGUoKS5zZXR0aW5ncy5pZChTdG9yZS5nZXRTdGF0ZSgpLm5hbWUsIFN0b3JlLmdldFN0YXRlKCkuY2xvbmVzLmxlbmd0aCArIDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnYXJpYS1sYWJlbCc6IFN0b3JlLmdldFN0YXRlKCkubGFiZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoKE9iamVjdC5hc3NpZ24oe30sIFN0b3JlLmdldFN0YXRlKCkuc2V0dGluZ3MuZGVsZXRlQnV0dG9uLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IE9iamVjdC5hc3NpZ24oe30sIFN0b3JlLmdldFN0YXRlKCkuc2V0dGluZ3MuZGVsZXRlQnV0dG9uLmF0dHJpYnV0ZXMsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uY2xpY2s6IHJlbW92ZUlucHV0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25rZXl1cChlKXsgaWYoIWUua2V5Q29kZSB8fCBlLmtleUNvZGUgPT09IEtFWV9DT0RFUy5FTlRFUikgcmVtb3ZlSW5wdXQuY2FsbCh0aGlzKTsgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICBTdG9yZS51cGRhdGUoUmVkdWNlcnMuYWRkSW5wdXQsIHtcbiAgICAgICAgY29udGFpbmVyOiBTdG9yZS5nZXRTdGF0ZSgpLmJ1dHRvbi5wYXJlbnROb2RlLmluc2VydEJlZm9yZShub2RlLCBTdG9yZS5nZXRTdGF0ZSgpLmJ1dHRvbiksXG4gICAgICAgIGlucHV0OiBub2RlLmZpcnN0RWxlbWVudENoaWxkLFxuICAgICAgICBidXR0b246IG5vZGUubGFzdEVsZW1lbnRDaGlsZFxuICAgIH0pO1xuXG4gICAgbm9kZS5maXJzdEVsZW1lbnRDaGlsZC5mb2N1cygpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgKG5vZGUsIHNldHRpbmdzKSA9PiB7XG4gICAgU3RvcmUudXBkYXRlKFJlZHVjZXJzLnNldEluaXRpYWxTdGF0ZSwge1xuICAgICAgICBidXR0b246IG5vZGUsXG4gICAgICAgIHNldHRpbmdzLFxuICAgICAgICBsYWJlbDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2Zvcj1cIiR7bm9kZS5nZXRBdHRyaWJ1dGUoREFUQV9BVFRSSUJVVEVTLklOUFVUX0lEKX1cIl1gKS5pbm5lclRleHQgfHwgJycsXG4gICAgICAgIGlucHV0OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChub2RlLmdldEF0dHJpYnV0ZShEQVRBX0FUVFJJQlVURVMuSU5QVVRfSUQpKSxcbiAgICAgICAgbmFtZTogbm9kZS5nZXRBdHRyaWJ1dGUoREFUQV9BVFRSSUJVVEVTLk5BTUVfQkFTRSksXG4gICAgICAgIGNsb25lczogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZXR0aW5ncy5zZXJ2ZXJSZW5kZXJlZFNlbGVjdG9yKSA/IGNsb25lc0Zyb21ET00oW10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNldHRpbmdzLnNlcnZlclJlbmRlcmVkU2VsZWN0b3IpKSkgOiBbXVxuICAgIH0pO1xuXG4gICAgVFJJR0dFUl9FVkVOVFMuZm9yRWFjaChldiA9PiB7XG4gICAgICAgIFN0b3JlLmdldFN0YXRlKCkuYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoZXYsIGUgPT4ge1xuICAgICAgICAgICAgaWYoIWUua2V5Q29kZSB8fCBlLmtleUNvZGUgPT09IEtFWV9DT0RFUy5FTlRFUikgYWRkSW5wdXQoKTtcbiAgICAgICAgfSlcbiAgICAgICAgaWYoU3RvcmUuZ2V0U3RhdGUoKS5jbG9uZXMubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICBTdG9yZS5nZXRTdGF0ZSgpLmNsb25lcy5mb3JFYWNoKGNsb25lID0+IHtcbiAgICAgICAgICAgICAgICBjbG9uZS5idXR0b24uYWRkRXZlbnRMaXN0ZW5lcihldiwgZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmKCFlLmtleUNvZGUgfHwgZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuRU5URVIpIHJlbW92ZUlucHV0LmNhbGwoY2xvbmUuYnV0dG9uKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBcbiAgICByZXR1cm4ge1xuICAgICAgICBhZGRJbnB1dFxuICAgIH1cbn07IiwiZXhwb3J0IGRlZmF1bHQge1xuICAgIHNldEluaXRpYWxTdGF0ZTogKHN0YXRlLCBkYXRhKSA9PiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgZGF0YSksXG4gICAgYWRkSW5wdXQ6IChzdGF0ZSwgZGF0YSkgPT4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgY2xvbmVzOiBbLi4uc3RhdGUuY2xvbmVzLCBkYXRhXX0pLFxuICAgIGRlbGV0ZUlucHV0OiAoc3RhdGUsIGRhdGEpID0+IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IGNsb25lczogc3RhdGUuY2xvbmVzLmZpbHRlcihjbG9uZSA9PiBjbG9uZS5idXR0b24gIT09IGRhdGEuYnV0dG9uKX0pXG59OyIsImV4cG9ydCBkZWZhdWx0IHtcbiAgICBzdGF0ZToge1xuICAgICAgICBjbG9uZXM6IFtdXG4gICAgfSxcbiAgICB1cGRhdGUocmVkdWNlciwgbmV4dFN0YXRlLCBlZmZlY3RzID0gW10peyBcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHJlZHVjZXIodGhpcy5zdGF0ZSwgbmV4dFN0YXRlKTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5zdGF0ZSk7XG4gICAgICAgIGlmKGVmZmVjdHMubGVuZ3RoID4gMCkgZWZmZWN0cy5mb3JFYWNoKGVmZmVjdCA9PiB7IGVmZmVjdCgpIH0pO1xuICAgIH0sXG4gICAgZ2V0U3RhdGUoKSB7IHJldHVybiB0aGlzLnN0YXRlIH1cbn07Il19
