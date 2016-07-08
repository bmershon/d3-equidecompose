import cross from "../vector/cross";

// Tests if point is to the right of an edge (CCW order).
export default function(point, edge) {
  return cross(point, edge[0], edge[1])[2] < 0;
}