import {polygonCentroid, polygonContains} from "d3-polygon";

export default function triangulate(vertices) {
  var layout,
      triangles;

  layout = null;

  triangles = layout.triangles(vertices).filter(function(d) {
    return polygonContains(vertices, polygonCentroid(d));
  });

  return triangles;
}
