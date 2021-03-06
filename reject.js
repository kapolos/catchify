'use strict';

var onCatch = require('./lib/onCatch');

function reject(reason) {
  return Promise.reject(reason).catch(onCatch);
}

module.exports = reject;