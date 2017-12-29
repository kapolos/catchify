'use strict';

var limit = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(iterable) {
    var limit,
        exitOnError,
        _objToArray,
        _objToArray2,
        keys,
        items,
        allErrors,
        allValues,
        queue,
        _iteratorNormalCompletion,
        _didIteratorError,
        _iteratorError,
        _iterator,
        _step,
        value,
        _ref3,
        _ref4,
        _errors,
        _values,
        _ref,
        _ref2,
        errors,
        values,
        _args = arguments;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            limit = _args.length > 1 && _args[1] !== undefined ? _args[1] : 2;
            exitOnError = _args.length > 2 && _args[2] !== undefined ? _args[2] : false;
            _objToArray = objToArray(iterable), _objToArray2 = _slicedToArray(_objToArray, 2), keys = _objToArray2[0], items = _objToArray2[1];
            allErrors = [];
            allValues = [];
            queue = [];
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 9;
            _iterator = items[Symbol.iterator]();

          case 11:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 29;
              break;
            }

            value = _step.value;


            queue.push(typeof value === 'function' ? value() : value);

            if (!(queue.length === limit)) {
              _context.next = 26;
              break;
            }

            _context.next = 17;
            return some(queue);

          case 17:
            _ref3 = _context.sent;
            _ref4 = _slicedToArray(_ref3, 2);
            _errors = _ref4[0];
            _values = _ref4[1];


            allErrors.push.apply(allErrors, _toConsumableArray(_errors));
            allValues.push.apply(allValues, _toConsumableArray(_values));
            queue.length = 0;

            if (!(exitOnError && _errors.filter(function (err) {
              return err;
            }).length > 0)) {
              _context.next = 26;
              break;
            }

            return _context.abrupt("break", 29);

          case 26:
            _iteratorNormalCompletion = true;
            _context.next = 11;
            break;

          case 29:
            _context.next = 35;
            break;

          case 31:
            _context.prev = 31;
            _context.t0 = _context["catch"](9);

            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 35:
            _context.prev = 35;
            _context.prev = 36;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 38:
            _context.prev = 38;

            if (!_didIteratorError) {
              _context.next = 41;
              break;
            }

            throw _iteratorError;

          case 41:
            return _context.finish(38);

          case 42:
            return _context.finish(35);

          case 43:
            if (!(queue.length > 0)) {
              _context.next = 52;
              break;
            }

            _context.next = 46;
            return some(queue);

          case 46:
            _ref = _context.sent;
            _ref2 = _slicedToArray(_ref, 2);
            errors = _ref2[0];
            values = _ref2[1];


            allErrors.push.apply(allErrors, _toConsumableArray(errors));
            allValues.push.apply(allValues, _toConsumableArray(values));

          case 52:
            return _context.abrupt("return", [arrayToObj(keys, allErrors), arrayToObj(keys, allValues)]);

          case 53:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[9, 31, 35, 43], [36,, 38, 42]]);
  }));

  return function limit(_x) {
    return _ref5.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;_e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }return _arr;
  }return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }return arr2;
  } else {
    return Array.from(arr);
  }
}

var arrayToObj = require('./lib/arrayToObj');
var objToArray = require('./lib/objToArray');
var some = require('./some');

module.exports = limit;