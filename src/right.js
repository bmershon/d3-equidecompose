import {default as sub} from "./sub";

//  Tests if point is to the right of an edge (CCW order).
export default function(point, edge) {
  var u = sub(point, edge[0]),
      v = sub(edge[1], edge[0]),
      z = u[0]*v[1] - v[0]*u[1];
  
  return z >= 0;
}