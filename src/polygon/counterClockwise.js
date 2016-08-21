import right from "./right";

// Sort points in-place to produce counterclockwise winding order.
export default function(P) {
  var C = P.centroid();
  if (!right(C, P.slice(0, 2))) P.reverse();
  return P;
}