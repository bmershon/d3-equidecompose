import {polygonCentroid, polygonContains} from "d3-polygon";
import earcut from "earcut"; // External Mapbox earcut module.

export default function triangulate(vertices) {
  var indices,
      triangles;

  indices = earcut(flattenCoordinates(vertices));
  triangles = unflattenTriangles(decodeIndices(indices, vertices));

  return triangles;
}

function flattenCoordinates(points) {
  var i, n,
      flattened = [];

  for (i = 0, n = points.length; i < n; i++) {
    flattened.push(points[i][0], points[i][1]);
  } 

  return flattened;
}

function decodeIndices(indices, points) {
  return indices.map(function(i) { return points[i]; });
}

function unflattenTriangles(points) {
  var i, n,
      decoded = [];

  for (i = 0, n = points.length; i < n; i += 3) {
    decoded.push([points[i], points[i + 1], points[i + 2]]);
  }

  return decoded;
}
