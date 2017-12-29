'use strict';

var onCatch = require('./lib/onCatch');
var onThen = require('./lib/onThen');

function race(iterable) {
  return Promise.race(iterable).then(onThen, onCatch);
}

module.exports = race;