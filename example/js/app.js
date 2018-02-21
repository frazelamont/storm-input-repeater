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

var _lib = require('./lib');

var _lib2 = _interopRequireDefault(_lib);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var init = function init(sel, opts) {
	var els = [].slice.call(document.querySelectorAll(sel));

	if (!els.length) return console.warn('No input clone buttons found');

	return els.map(function (el) {
		return Object.create((0, _lib2.default)(el));
	});
};

exports.default = { init: init };

},{"./lib":4}],3:[function(require,module,exports){
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

var _constants = require('./constants');

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

var _reducers = require('./reducers');

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
        obj[key] = value;
    }return obj;
}

var updateAttributes = function updateAttributes(node, attributes) {
    for (var key in attributes) {
        node.setAttribute(key, attributes[key]);
    }return node;
};

var addInput = function addInput() {
    var node = updateAttributes(_store2.default.getState().input.cloneNode(true), {
        name: _store2.default.getState().name + '[' + _store2.default.getState().count + ']',
        id: _store2.default.getState().name + '_' + _store2.default.getState().count + '_',
        'aria-label': _store2.default.getState().label
    });

    _store2.default.update(_reducers2.default.addInput, _defineProperty({}, _store2.default.getState().name + '[' + _store2.default.getState().count + ']', _store2.default.getState().button.parentNode.insertBefore(node, _store2.default.getState().button)));

    node.focus();
};

exports.default = function (node) {
    _store2.default.update(_reducers2.default.setInitialState, {
        button: node,
        label: document.querySelector('[for=' + node.getAttribute('data-input')).innerText,
        input: document.getElementById(node.getAttribute('data-input')),
        name: node.getAttribute('data-input-name'),
        count: node.getAttribute('data-input-count') !== undefined ? +node.getAttribute('data-input-count') : _store2.default.getState().count
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

/*

- Delete input?
- Allow adding of inputs under any circumstances? if no value in all others/previous one?
- Id/name convention?

*/

},{"./constants":3,"./reducers":5,"./store":6}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
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

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJleGFtcGxlL3NyYy9hcHAuanMiLCJleGFtcGxlL3NyYy9saWJzL2NvbXBvbmVudC9pbmRleC5qcyIsImV4YW1wbGUvc3JjL2xpYnMvY29tcG9uZW50L2xpYi9jb25zdGFudHMuanMiLCJleGFtcGxlL3NyYy9saWJzL2NvbXBvbmVudC9saWIvaW5kZXguanMiLCJleGFtcGxlL3NyYy9saWJzL2NvbXBvbmVudC9saWIvcmVkdWNlcnMuanMiLCJleGFtcGxlL3NyYy9saWJzL2NvbXBvbmVudC9saWIvc3RvcmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7Ozs7OztBQUVBLElBQU0sMkJBQTJCLFlBQU0sQUFDbkM7QUFDQTtXQUFBLEFBQU8sa0JBQWtCLG9CQUFBLEFBQVcsS0FBcEMsQUFBeUIsQUFBZ0IsQUFDNUM7QUFIRCxBQUFnQyxDQUFBOztBQUtoQyxBQUFFOzRCQUFBLEFBQXdCLFFBQVEsVUFBQSxBQUFDLElBQUQ7ZUFBQSxBQUFRO0FBQXhDLEFBQWdEOzs7Ozs7Ozs7O0FDUGxEOzs7Ozs7OztBQUVBLElBQU0sT0FBTyxTQUFQLEFBQU8sS0FBQSxBQUFDLEtBQUQsQUFBTSxNQUFTLEFBQzNCO0tBQUksTUFBTSxHQUFBLEFBQUcsTUFBSCxBQUFTLEtBQUssU0FBQSxBQUFTLGlCQUFqQyxBQUFVLEFBQWMsQUFBMEIsQUFFbEQ7O0tBQUcsQ0FBQyxJQUFKLEFBQVEsUUFBUSxPQUFPLFFBQUEsQUFBUSxLQUFmLEFBQU8sQUFBYSxBQUVwQzs7WUFBTyxBQUFJLElBQUksY0FBQTtTQUFNLE9BQUEsQUFBTyxPQUFPLG1CQUFwQixBQUFNLEFBQWMsQUFBUTtBQUEzQyxBQUFPLEFBQ1AsRUFETztBQUxSOztrQkFRZSxFQUFFLE0sQUFBRjs7Ozs7Ozs7QUNWUixJQUFNO1dBQU4sQUFBa0IsQUFDZDtBQURjLEFBQ3JCOztBQUdHLElBQU0sMENBQWlCLENBQUEsQUFB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cEI7QUFSVSxBQVNYO0FBVFcsa0NBU0EsQUFBRTtlQUFPLEtBQVAsQUFBWSxBQUFPO0EsQUFUckI7QUFBQSxBQUNYIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc31yZXR1cm4gZX0pKCkiLCJpbXBvcnQgSW5wdXRDbG9uZSBmcm9tICcuL2xpYnMvY29tcG9uZW50JztcblxuY29uc3Qgb25ET01Db250ZW50TG9hZGVkVGFza3MgPSBbKCkgPT4ge1xuICAgIC8vIGNvbnNvbGUubG9nKGlucHV0Q2xvbmUpO1xuICAgIHdpbmRvdy5fX0lOUFVUX0NMT05FX18gPSBJbnB1dENsb25lLmluaXQoJy5qcy1pbnB1dF9fY2xvbmUnKTtcbn1dO1xuXG57IG9uRE9NQ29udGVudExvYWRlZFRhc2tzLmZvckVhY2goKGZuKSA9PiBmbigpKTsgfSIsImltcG9ydCBmYWN0b3J5IGZyb20gJy4vbGliJztcblxuY29uc3QgaW5pdCA9IChzZWwsIG9wdHMpID0+IHtcblx0bGV0IGVscyA9IFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWwpKTtcblxuXHRpZighZWxzLmxlbmd0aCkgcmV0dXJuIGNvbnNvbGUud2FybignTm8gaW5wdXQgY2xvbmUgYnV0dG9ucyBmb3VuZCcpO1xuICAgIFxuXHRyZXR1cm4gZWxzLm1hcChlbCA9PiBPYmplY3QuY3JlYXRlKGZhY3RvcnkoZWwpKSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7IGluaXQgfTsiLCJleHBvcnQgY29uc3QgS0VZX0NPREVTID0ge1xuICAgIEVOVEVSOiAxM1xufTtcblxuZXhwb3J0IGNvbnN0IFRSSUdHRVJfRVZFTlRTID0gWydjbGljaycsICdrZXlkb3duJyBdOyIsImltcG9ydCB7IEtFWV9DT0RFUywgVFJJR0dFUl9FVkVOVFMgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgU3RvcmUgZnJvbSAnLi9zdG9yZSc7XG5pbXBvcnQgUmVkdWNlcnMgZnJvbSAnLi9yZWR1Y2Vycyc7XG5cbmNvbnN0IHVwZGF0ZUF0dHJpYnV0ZXMgPSAobm9kZSwgYXR0cmlidXRlcykgPT4ge1xuICAgIGZvcihsZXQga2V5IGluIGF0dHJpYnV0ZXMpIG5vZGUuc2V0QXR0cmlidXRlKGtleSwgYXR0cmlidXRlc1trZXldKTtcbiAgICByZXR1cm4gbm9kZTtcbn07XG5cbmNvbnN0IGFkZElucHV0ID0gKCkgPT4ge1xuICAgIGxldCBub2RlID0gdXBkYXRlQXR0cmlidXRlcyhTdG9yZS5nZXRTdGF0ZSgpLmlucHV0LmNsb25lTm9kZSh0cnVlKSwge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBgJHtTdG9yZS5nZXRTdGF0ZSgpLm5hbWV9WyR7U3RvcmUuZ2V0U3RhdGUoKS5jb3VudH1dYCxcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGAke1N0b3JlLmdldFN0YXRlKCkubmFtZX1fJHtTdG9yZS5nZXRTdGF0ZSgpLmNvdW50fV9gLFxuICAgICAgICAgICAgICAgICAgICAnYXJpYS1sYWJlbCc6IFN0b3JlLmdldFN0YXRlKCkubGFiZWxcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgIFN0b3JlLnVwZGF0ZShSZWR1Y2Vycy5hZGRJbnB1dCwgeyBcbiAgICAgICAgW2Ake1N0b3JlLmdldFN0YXRlKCkubmFtZX1bJHtTdG9yZS5nZXRTdGF0ZSgpLmNvdW50fV1gXTogU3RvcmUuZ2V0U3RhdGUoKS5idXR0b24ucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobm9kZSwgU3RvcmUuZ2V0U3RhdGUoKS5idXR0b24pXG4gICAgfSk7XG5cbiAgICBub2RlLmZvY3VzKCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBub2RlID0+IHtcbiAgICBTdG9yZS51cGRhdGUoUmVkdWNlcnMuc2V0SW5pdGlhbFN0YXRlLCB7XG4gICAgICAgIGJ1dHRvbjogbm9kZSxcbiAgICAgICAgbGFiZWw6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtmb3I9JHtub2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1pbnB1dCcpfWApLmlubmVyVGV4dCxcbiAgICAgICAgaW5wdXQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLWlucHV0JykpLFxuICAgICAgICBuYW1lOiBub2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1pbnB1dC1uYW1lJyksXG4gICAgICAgIGNvdW50OiBub2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1pbnB1dC1jb3VudCcpICE9PSB1bmRlZmluZWQgPyArbm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5wdXQtY291bnQnKSA6IFN0b3JlLmdldFN0YXRlKCkuY291bnRcbiAgICB9KTtcblxuICAgIFRSSUdHRVJfRVZFTlRTLmZvckVhY2goZXYgPT4ge1xuICAgICAgICBTdG9yZS5nZXRTdGF0ZSgpLmJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKGV2LCBlID0+IHtcbiAgICAgICAgICAgIGlmKCFlLmtleUNvZGUgfHwgZS5rZXlDb2RlID09PSBLRVlfQ09ERVMuRU5URVIpIGFkZElucHV0KCk7XG4gICAgICAgIH0pXG4gICAgfSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBhZGRJbnB1dFxuICAgIH1cbn07XG5cbi8qXG5cbi0gRGVsZXRlIGlucHV0P1xuLSBBbGxvdyBhZGRpbmcgb2YgaW5wdXRzIHVuZGVyIGFueSBjaXJjdW1zdGFuY2VzPyBpZiBubyB2YWx1ZSBpbiBhbGwgb3RoZXJzL3ByZXZpb3VzIG9uZT9cbi0gSWQvbmFtZSBjb252ZW50aW9uP1xuXG4qLyIsImV4cG9ydCBkZWZhdWx0IHtcbiAgICBzZXRJbml0aWFsU3RhdGU6IChzdGF0ZSwgZGF0YSkgPT4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIGRhdGEpLFxuICAgIGFkZElucHV0OiAoc3RhdGUsIGRhdGEpID0+IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvbmVzOiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5jbG9uZXMsIGRhdGEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50OiBzdGF0ZS5jb3VudCArIDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbn07IiwiZXhwb3J0IGRlZmF1bHQge1xuICAgIHN0YXRlOiB7XG4gICAgICAgIGNvdW50OiAxLFxuICAgICAgICBjbG9uZXM6IHt9XG4gICAgfSxcbiAgICB1cGRhdGUocmVkdWNlciwgbmV4dFN0YXRlKXsgXG4gICAgICAgIHRoaXMuc3RhdGUgPSByZWR1Y2VyKHRoaXMuc3RhdGUsIG5leHRTdGF0ZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc3RhdGUpO1xuICAgIH0sXG4gICAgZ2V0U3RhdGUoKSB7IHJldHVybiB0aGlzLnN0YXRlIH1cbn07Il19
