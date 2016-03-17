"use strict";
var tape = require("tape"),
    cut = require("../build/d3-equidecompose.js");

require("./inDelta.js"); // add functionality to test suite

tape("intersect a = [1, 1], b = [3, 2], c = [1, 4], d = [2, -1]", function(test) {
  var a = [1, 1], b = [3, 2], c = [1, 4], d = [2, -1];
  var p = cut.intersect(a, b, c, d);
  test.ok(p, "intersection exists"); // points intersect
  test.inDelta(p[0], 17/11);
  test.inDelta(p[1], 14/11);
  test.end();
});
