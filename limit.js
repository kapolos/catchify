'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var arrayToObj = require('./lib/arrayToObj');
var objToArray = require('./lib/objToArray');
var some = require('./some');

async function limit(iterable) {
  var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  var exitOnError = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var _objToArray = objToArray(iterable),
      _objToArray2 = _slicedToArray(_objToArray, 2),
      keys = _objToArray2[0],
      items = _objToArray2[1];

  var allErrors = [];
  var allValues = [];
  var queue = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var value = _step.value;

      queue.push(typeof value === 'function' ? value() : value);
      if (queue.length === limit) {
        var _ref3 = await some(queue),
            _ref4 = _slicedToArray(_ref3, 2),
            _errors = _ref4[0],
            _values = _ref4[1];

        allErrors.push.apply(allErrors, _toConsumableArray(_errors));
        allValues.push.apply(allValues, _toConsumableArray(_values));
        queue.length = 0;
        if (exitOnError && _errors.filter(function (err) {
          return err;
        }).length > 0) {
          break;
        }
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  if (queue.length > 0) {
    var _ref = await some(queue),
        _ref2 = _slicedToArray(_ref, 2),
        errors = _ref2[0],
        values = _ref2[1];

    allErrors.push.apply(allErrors, _toConsumableArray(errors));
    allValues.push.apply(allValues, _toConsumableArray(values));
  }
  return [arrayToObj(keys, allErrors), arrayToObj(keys, allValues)];
}

module.exports = limit;