'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var subject = require('./limit');
var test = require('ava');

test('catchify.limit - three promises, last one rejects', async function (t) {
  var _ref = await subject([new Promise(function (resolve, reject) {
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
      _ref2 = _slicedToArray(_ref, 2),
      errors = _ref2[0],
      values = _ref2[1];

  t.deepEqual(errors, [null, null, new Error('3')]);
  t.deepEqual(values, [1, 2, null]);
});

test('catchify.limit - three promises, second one rejects', async function (t) {
  var _ref3 = await subject([new Promise(function (resolve, reject) {
    return setTimeout(function () {
      return resolve(1);
    }, 5);
  }), new Promise(function (resolve, reject) {
    return setTimeout(function () {
      return reject(new Error('2'));
    }, 5);
  }), new Promise(function (resolve, reject) {
    return setTimeout(function () {
      return resolve(3);
    }, 5);
  })]),
      _ref4 = _slicedToArray(_ref3, 2),
      errors = _ref4[0],
      values = _ref4[1];

  t.deepEqual(errors, [null, new Error('2'), null]);
  t.deepEqual(values, [1, null, 3]);
});

test('catchify.limit - three promises, first one rejects', async function (t) {
  var _ref5 = await subject([new Promise(function (resolve, reject) {
    return setTimeout(function () {
      return resolve(1);
    }, 5);
  }), new Promise(function (resolve, reject) {
    return setTimeout(function () {
      return reject(new Error('2'));
    }, 5);
  }), new Promise(function (resolve, reject) {
    return setTimeout(function () {
      return resolve(3);
    }, 5);
  })]),
      _ref6 = _slicedToArray(_ref5, 2),
      errors = _ref6[0],
      values = _ref6[1];

  t.deepEqual(errors, [null, new Error('2'), null]);
  t.deepEqual(values, [1, null, 3]);
});

test('catchify.limit - three promises, first one rejects', async function (t) {
  var _ref7 = await subject([new Promise(function (resolve, reject) {
    return setTimeout(function () {
      return reject(new Error('1'));
    }, 5);
  }), new Promise(function (resolve, reject) {
    return setTimeout(function () {
      return resolve(2);
    }, 5);
  }), new Promise(function (resolve, reject) {
    return setTimeout(function () {
      return resolve(3);
    }, 5);
  })]),
      _ref8 = _slicedToArray(_ref7, 2),
      errors = _ref8[0],
      values = _ref8[1];

  t.deepEqual(errors, [new Error('1'), null, null]);
  t.deepEqual(values, [null, 2, 3]);
});

test('catchify.limit - three promises, first one rejects, limit=1, exitOnError=true', async function (t) {
  var _ref9 = await subject([new Promise(function (resolve, reject) {
    return setTimeout(function () {
      return reject(new Error('1'));
    }, 5);
  }), new Promise(function (resolve, reject) {
    return setTimeout(function () {
      return resolve(2);
    }, 5);
  }), new Promise(function (resolve, reject) {
    return setTimeout(function () {
      return resolve(3);
    }, 5);
  })], 1, true),
      _ref10 = _slicedToArray(_ref9, 2),
      errors = _ref10[0],
      values = _ref10[1];

  t.deepEqual(errors, [new Error('1')]);
  t.deepEqual(values, [null]);
});

test('catchify.limit - three promises, second one rejects, limit=1, exitOnError=true', async function (t) {
  var _ref11 = await subject([new Promise(function (resolve, reject) {
    return setTimeout(function () {
      return resolve(1);
    }, 5);
  }), new Promise(function (resolve, reject) {
    return setTimeout(function () {
      return reject(new Error('2'));
    }, 5);
  }), new Promise(function (resolve, reject) {
    return setTimeout(function () {
      return resolve(3);
    }, 5);
  })], 1, true),
      _ref12 = _slicedToArray(_ref11, 2),
      errors = _ref12[0],
      values = _ref12[1];

  t.deepEqual(errors, [null, new Error('2')]);
  t.deepEqual(values, [1, null]);
});

test('catchify.limit - object with three resolved values', async function (t) {
  var _ref13 = await subject({
    a: Promise.resolve(1),
    b: Promise.resolve(2),
    c: Promise.resolve(3)
  }),
      _ref14 = _slicedToArray(_ref13, 2),
      errors = _ref14[0],
      values = _ref14[1];

  t.deepEqual(errors, { a: null, b: null, c: null });
  t.deepEqual(values, { a: 1, b: 2, c: 3 });
});

test('catchify.limit - object with two resolved values and one rejected value', async function (t) {
  var _ref15 = await subject({
    a: Promise.resolve(1),
    b: Promise.reject(new Error('2')),
    c: Promise.resolve(3)
  }),
      _ref16 = _slicedToArray(_ref15, 2),
      errors = _ref16[0],
      values = _ref16[1];

  t.deepEqual(errors, { a: null, b: new Error('2'), c: null });
  t.deepEqual(values, { a: 1, b: null, c: 3 });
});