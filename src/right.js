import {default as sub} from "./sub";

// Tests if point p is to the right of edge e.
// p is a single coordinate.
// e is an array of 2 coordinates.
export default function(p, e) {
  var u = sub(p, e[0]);
  var v = sub(e[1], e[0]);
  
  var z = u[0]*v[1] - v[0]*u[1];
  return z >= 0;
}