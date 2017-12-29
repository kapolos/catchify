'use strict';

var subject = require('./arrayToObj');
var test = require('ava');

test('arrayToObj - object created from keys and values', function (t) {
  var actual = subject(['a', 'b'], [1, 2]);
  var expected = { a: 1, b: 2 };
  t.deepEqual(actual, expected);
});