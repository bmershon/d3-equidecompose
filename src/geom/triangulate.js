import voronoi from "d3-voronoi";

// Returns the constrained Voroni triangulation of the given
// simple convex polygon.
export default function triangulate(vertices) {
  var layout, triangles;

  layout = voronoi(vertices);
  triangles = layout.polygons();

  return triangles;
}