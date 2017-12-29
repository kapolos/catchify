'use strict';

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

var arrayToObj = require('./lib/arrayToObj');
var objToArray = require('./lib/objToArray');

function onThenAllFactory(keys) {
  return function onThenAll(value) {
    return [null, arrayToObj(keys, value)];
  };
}

function onCatchAllFactory(keys) {
  return function onCatchAll(error) {
    return [error, keys ? {} : []];
  };
}

function all(iterable) {
  var _objToArray = objToArray(iterable),
      _objToArray2 = _slicedToArray(_objToArray, 2),
      keys = _objToArray2[0],
      values = _objToArray2[1];

  return Promise.all(values).then(onThenAllFactory(keys), onCatchAllFactory(keys));
}

module.exports = all;