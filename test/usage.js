/*jslint indent: 2, maxlen: 80, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

module.exports = function readmeDemo(console) {
  function readLatestPost(cb) { setImmediate(cb, null, 'test', 'hello'); }
  //#u
  var splitCb = require('splitcb'), nodeback;

  nodeback = splitCb();
  readLatestPost(nodeback); // ignore result if success, throw error otherwise

  function displayPost(topic, text) { console.log(topic, ':', text); }
  nodeback = splitCb(displayPost);
  readLatestPost(nodeback); // displayPost or throw error

  function reportFailure(err) { console.log('Error:', err); }
  nodeback = splitCb(displayPost, reportFailure);
  readLatestPost(nodeback); // displayPost or reportFailure

  nodeback = splitCb(null, reportFailure);
  readLatestPost(nodeback); // reportFailure but ignore success result
  //#r
};
