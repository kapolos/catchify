'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var arrayToObj = require('./lib/arrayToObj');
var objToArray = require('./lib/objToArray');

function onValue(value) {
  return {
    error: null,
    value: value
  };
}

function onError(error) {
  return {
    error: error,
    value: null
  };
}

function extractValue(result) {
  return result.value || null;
}

function extractError(result) {
  return result.error || null;
}

function onThenWithErrorsFactory(keys) {
  return function onThenWithErrors(results) {
    return [arrayToObj(keys, results.map(extractError)), arrayToObj(keys, results.map(extractValue))];
  };
}

function some(iterable) {
  var _objToArray = objToArray(iterable),
      _objToArray2 = _slicedToArray(_objToArray, 2),
      keys = _objToArray2[0],
      items = _objToArray2[1];

  var promises = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var value = _step.value;

      promises.push(Promise.resolve(value).then(onValue, onError));
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

  return Promise.all(promises).then(onThenWithErrorsFactory(keys));
}

module.exports = some;