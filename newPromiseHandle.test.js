'use strict';

var subject = require('./newPromiseHandle');
var test = require('ava');

test('Handle has expected keys', function (t) {
  var handle = subject();
  t.truthy(handle.promise);
  t.truthy(handle.resolve);
  t.truthy(handle.reject);
});

test('Promise resolves as expected', async function (t) {
  var handle = subject();
  var expected = 'resolve';
  handle.resolve(expected);
  var actual = await handle.promise;
  t.is(actual, expected);
});

test('Promise rejects as expected', async function (t) {
  var handle = subject();
  var expected = 'reject';
  handle.reject(expected);
  try {
    await handle.promise;
  } catch (actual) {
    t.is(actual, expected);
  }
});

test('Reject returns rejected promise', async function (t) {
  var handle = subject();
  var expected = 'reject';
  try {
    await handle.reject(expected);
  } catch (actual) {
    t.is(actual, expected);
  }
});

test('Resolve returns resolved promise', async function (t) {
  var handle = subject();
  var expected = 'resolve';
  var actual = await handle.resolve(expected);
  t.is(actual, expected);
});