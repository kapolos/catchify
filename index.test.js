'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var catchify = require('./index');
var test = require('ava');

test('catchify - promise with success', async function (t) {
  var _ref = await catchify(Promise.resolve(1)),
      _ref2 = _slicedToArray(_ref, 2),
      error = _ref2[0],
      value = _ref2[1];

  t.is(error, null);
  t.is(value, 1);
});

test('catchify.resolve - promise with success', async function (t) {
  var _ref3 = await catchify.resolve(Promise.resolve(1)),
      _ref4 = _slicedToArray(_ref3, 2),
      error = _ref4[0],
      value = _ref4[1];

  t.is(error, null);
  t.is(value, 1);
});

test('catchify.reject - value', async function (t) {
  var _ref5 = await catchify.reject(1),
      _ref6 = _slicedToArray(_ref5, 2),
      error = _ref6[0],
      value = _ref6[1];

  t.is(error, 1);
  t.is(value, null);
});

test('catchify.race - two values', async function (t) {
  var _ref7 = await catchify.race([1, 2]),
      _ref8 = _slicedToArray(_ref7, 2),
      error = _ref8[0],
      value = _ref8[1];

  t.is(error, null);
  t.is(value, 1);
});

test('catchify.all - two values resolved', async function (t) {
  var _ref9 = await catchify.all([1, 2]),
      _ref10 = _slicedToArray(_ref9, 2),
      error = _ref10[0],
      _ref10$ = _slicedToArray(_ref10[1], 2),
      value1 = _ref10$[0],
      value2 = _ref10$[1];

  t.is(error, null);
  t.is(value1, 1);
  t.is(value2, 2);
});

test('catchify.some - resolve and reject', async function (t) {
  var _ref11 = await catchify.some([Promise.resolve(1), Promise.reject(new Error('2'))]),
      _ref12 = _slicedToArray(_ref11, 2),
      _ref12$ = _slicedToArray(_ref12[0], 2),
      error1 = _ref12$[0],
      error2 = _ref12$[1],
      _ref12$2 = _slicedToArray(_ref12[1], 2),
      value1 = _ref12$2[0],
      value2 = _ref12$2[1];

  t.is(error1, null);
  t.is(error2.message, '2');
  t.is(value1, 1);
  t.is(value2, null);
});

test('catchify.limit - three promises, last one rejects', async function (t) {
  var _ref13 = await catchify.limit([new Promise(function (resolve, reject) {
    return setTimeout(function () {
      return resolve(1);
    }, 5);
  }), new Promise(function (resolve, reject) {
    return setTimeout(function () {
      return resolve(2);
    }, 5);
  }), new Promise(function (resolve, reject) {
    return setTimeout(function () {
      return reject(new Error('3'));
    }, 5);
  })]),
      _ref14 = _slicedToArray(_ref13, 2),
      errors = _ref14[0],
      values = _ref14[1];

  t.deepEqual(errors, [null, null, new Error('3')]);
  t.deepEqual(values, [1, 2, null]);
});

test('catchify.newPromiseHandle returns a promise handle object', function (t) {
  var handle = catchify.newPromiseHandle();
  t.truthy(handle.promise);
  t.truthy(handle.resolve);
  t.truthy(handle.reject);
});