"use strict";
var tape = require("tape"),
    partials = require("../build/partials.js");

require("../test/inDelta.js"); // add functionality to test suite

tape("test object equality", function(test) {
  let a = [0, 0], b = [1, 0], c = [0, 1], P = partials.polygon([a, b, c]);
  test.deepEqual(P[0], a);
  test.deepEqual(P[1], b);
  test.deepEqual(P[2], c);
  test.end();
});