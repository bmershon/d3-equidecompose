import polygon from "./polygon";

//  In-place sort points in counter-clockwise order.
export default function(P){
  var c = P.centroid();

  P.sort(function(a, b){
    return  Math.atan2(b[1] - c[1], b[0] - c[0]) - Math.atan2(a[1] - c[1], a[0] - c[0]);
  });

  return P;
}