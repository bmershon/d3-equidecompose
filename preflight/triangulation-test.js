var tape = require("tape"),
    dev = require("../build/dev.js");

tape("triangulation of a convex polygon", function(test) {
  var polygon = [[50, 50], [150, 400], [400, 300], [500, 200], [100, 20]];
  var expected = [ [ [ 50, 50 ], [ 150, 400 ], [ 100, 20 ] ], [ [ 150, 400 ], [ 400, 300 ], [ 100, 20 ] ], [ [ 400, 300 ], [ 500, 200 ], [ 100, 20 ] ] ];
  test.deepEqual(dev.triangulate(polygon), expected);
  test.end();
});
