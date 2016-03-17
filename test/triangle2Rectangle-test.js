"use strict";
var tape = require("tape"),
    cut = require("../build/d3-equidecompose.js");

require("./inDelta.js"); // add functionality to test suite

tape("test cutting triangle into canonical rectangle", function(test) {
  let a = [0, 0], b = [1, -1], c = [0, 1];
  test.equal(cut.triangle2Rectangle([a, b, c]), 3*Math.PI/4);
  test.end();
});
