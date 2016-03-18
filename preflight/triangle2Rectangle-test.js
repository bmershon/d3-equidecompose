"use strict";
var tape = require("tape"),
    d3 = require("d3-polygon"),
    partials = require("../build/partials.js");

require("../test/inDelta.js"); // add functionality to test suite

tape("test cutting triangle into canonical rectangle", function(test) {
  var a = [0, 0], b = [1, -1], c = [0, 1],
      A0, A1, triangle, polygons;
      
  triangle = [a, b, c];
  A0 = d3.polygonArea(triangle);
  polygons = partials.triangle2Rectangle([a, b, c]);
  A1 = polygons.reduce(function(prev, d) { return prev + d3.polygonArea(d); }, 0.0); 
  test.inDelta(A1, A0, "area of rectangle should equal area of original tringle");

  A0 = d3.polygonArea([c, b, a]);
  polygons = partials.triangle2Rectangle([c, b, a]);
  A1 = polygons.reduce(function(prev, d) { return prev + d3.polygonArea(d); }, 0.0); 
  test.inDelta(A1, A0, "area of rectangle should equal area of original tringle");

  A0 = d3.polygonArea([b, c, a]);
  polygons = partials.triangle2Rectangle([b, c, a]);
  A1 = polygons.reduce(function(prev, d) { return prev + d3.polygonArea(d); }, 0.0); 
  test.inDelta(A1, A0, "area of rectangle should equal area of original tringle");

  test.end();
});
