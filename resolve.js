'use strict';

var onCatch = require('./lib/onCatch');
var onThen = require('./lib/onThen');

function resolve(p) {
  return Promise.resolve(p).then(onThen, onCatch);
}

module.exports = resolve;