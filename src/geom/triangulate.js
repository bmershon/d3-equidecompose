import {voronoi} from "d3-voronoi";
import {polygonCentroid, polygonContains} from "d3-polygon";

export default function triangulate(vertices) {
  var layout,
      triangles;

  layout = voronoi();

  triangles = layout.triangles(vertices).filter(function(d) {
    return polygonContains(vertices, polygonCentroid(d));
  });

  return triangles;
}
