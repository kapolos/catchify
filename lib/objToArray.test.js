'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var subject = require('./objToArray');
var test = require('ava');

test('objToArray - iterable is returned', function (t) {
  var expected = [];

  var _subject = subject(expected),
      _subject2 = _slicedToArray(_subject, 2),
      keys = _subject2[0],
      actual = _subject2[1];

  t.is(keys, null);
  t.deepEqual(actual, expected);
});

test('objToArray - obj is split into keys and values', function (t) {
  var obj = { a: 1, b: 2, c: 3, d: 4 };

  var _subject3 = subject(obj),
      _subject4 = _slicedToArray(_subject3, 2),
      keys = _subject4[0],
      values = _subject4[1];

  t.deepEqual(keys, Object.keys(obj));
  t.deepEqual(values, Object.values(obj));
});