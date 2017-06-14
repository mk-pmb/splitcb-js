/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */

module.exports = (function () {
  'use strict';
  var slice = Array.prototype.slice;

  function chk(x, d) {
    if (!x) { return; }
    if (typeof x.apply === 'function') { return; }
    throw new Error('Missing .apply method on argument ' + d);
  }

  return function splitCb(onSuccess, onError) {
    chk(onSuccess, 'onSuccess');
    chk(onError, 'onError');
    return function (err) {
      if (err) {
        if (onError) { return onError.apply(this, arguments); }
        throw err;
      }
      return (onSuccess && onSuccess.apply(this, slice.call(arguments, 1)));
    };
  };
}());
