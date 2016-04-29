import {default as sub} from "./sub";

// tests if point u is to the right of edge e
export default function(u, e) {
  var v = sub(e[1], e[0]);
  
  //console.log(u);
  //console.log(v);
  var z = u[0]*v[1] - v[0]*u[1];
  return z >= 0;
}