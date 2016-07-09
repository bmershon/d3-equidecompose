var tape = require("tape"),
    dev = require("../build/dev.js");

tape("triangulation of a concave polygon", function(test) {
  var polygon = [[50, 50], [150, 400], [400, 500], [200, 100], [100, 20]];
  console.log(dev.triangulate(polygon));
  test.equal(dev.triangulate(polygon), null);
  test.end();
});
