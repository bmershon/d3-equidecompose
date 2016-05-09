import cross from "./cross";

// Tests if point is to the right of an edge (CCW order).
export default function(point, edge) {
  return cross(point, edge[1], edge[0])[2] >= 0;
}