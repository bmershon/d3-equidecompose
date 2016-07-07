import right from "./right";

// In-place sort points in counter-clockwise order.
export default function(P) {
  var C = P.centroid();
  if (!right(C, P.slice(0, 2))) P.reverse();
  return P;
}