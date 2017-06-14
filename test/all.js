/*jslint indent: 2, maxlen: 80, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

try { require('usnam-pmb'); } catch (ignore) {}

var eq = require('equal-pmb'), splitCb = require('splitcb'),
  bad = new Error('Something bad happened');

function err2str(e) { return String((e || false).message || e); }
function concatIf(a, b) { return (b ? a.concat(b) : a); }
function typ3(x) { return String(x && typeof x).substr(0, 3); }


require('./usage.js')({ stub: 'fake console', log: typ3 });


function makeLoggingCb(sxs, err) {
  var cb;
  sxs = (sxs && function (a, b) { cb.log.push('+', a, b); });
  err = (err && function (e, a, b) { cb.log.push('-', err2str(e), a, b); });
  cb = splitCb(sxs, err);
  cb.log = [];

  function dareExp2(isFail, func, expArgs) {
    try {
      func();
    } catch (oops) {
      cb.log.push('!', err2str(oops));
    }
    return (isFail
      ? concatIf([ (err ? '-' : '!'), err2str(isFail) ], err && expArgs)
      : (sxs ? concatIf([ '+' ], expArgs) : []));
  }

  cb.expectLogEq = function (ex, dare, expArgs) {
    if (dare) { ex = dareExp2(ex, dare, expArgs); }
    console.log('?:', typ3(sxs), typ3(err), ex);
    eq(cb.log, ex);
    cb.log = [];
  };
  return cb;
}


(function multiTest1() {
  var errors = [null, bad, 42], callbacks = [];
  [true, null].forEach(function (sxs) {
    [true, null].forEach(function (err) {
      callbacks.push(makeLoggingCb(sxs, err));
    });
  });
  errors.forEach(function (failWhy) {
    console.log('!:', typ3(failWhy), err2str(failWhy));
    callbacks.forEach(function (cb) {

      cb.expectLogEq(failWhy,
        function () { cb(failWhy); },
        [undefined, undefined]);

      cb.expectLogEq(failWhy,
        function () { cb(failWhy, 'hello', 'world'); },
        ['hello', 'world']);

    });
  });
}());










console.log("+OK all test passed.");    //= "+OK all test passed."
