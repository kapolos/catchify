'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var subject = require('./all');
var test = require('ava');

test('catchify.all - two values resolved', async function (t) {
  var _ref = await subject([1, 2]),
      _ref2 = _slicedToArray(_ref, 2),
      error = _ref2[0],
      _ref2$ = _slicedToArray(_ref2[1], 2),
      value1 = _ref2$[0],
      value2 = _ref2$[1];

  t.is(error, null);
  t.is(value1, 1);
  t.is(value2, 2);
});

test('catchify.all - one of three promises rejected', async function (t) {
  var _ref3 = await subject([Promise.resolve(1), Promise.resolve(2), Promise.reject(new Error('3'))]),
      _ref4 = _slicedToArray(_ref3, 2),
      error = _ref4[0],
      _ref4$ = _slicedToArray(_ref4[1], 3),
      value1 = _ref4$[0],
      value2 = _ref4$[1],
      value3 = _ref4$[2];

  t.is(error.message, '3');
  t.is(value1, undefined);
  t.is(value2, undefined);
  t.is(value3, undefined);
});

test('catchify.all - object with values', async function (t) {
  var _ref5 = await subject({ a: 1, b: 2 }),
      _ref6 = _slicedToArray(_ref5, 2),
      error = _ref6[0],
      _ref6$ = _ref6[1],
      a = _ref6$.a,
      b = _ref6$.b;

  t.is(error, null);
  t.is(a, 1);
  t.is(b, 2);
});

test('catchify.all - object with promises that both resolve', async function (t) {
  var _ref7 = await subject({
    a: Promise.resolve(1),
    b: Promise.resolve(2)
  }),
      _ref8 = _slicedToArray(_ref7, 2),
      error = _ref8[0],
      _ref8$ = _ref8[1],
      a = _ref8$.a,
      b = _ref8$.b;

  t.is(error, null);
  t.is(a, 1);
  t.is(b, 2);
});

test('catchify.all - object with promises and one rejects', async function (t) {
  var _ref9 = await subject({
    a: Promise.resolve(1),
    b: Promise.reject(new Error('2'))
  }),
      _ref10 = _slicedToArray(_ref9, 2),
      error = _ref10[0],
      values = _ref10[1];

  t.is(error.message, '2');
  t.deepEqual(values, {});
});