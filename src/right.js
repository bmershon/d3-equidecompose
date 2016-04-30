import {default as sub} from "./sub";

// tests if point p is to the right of edge e
export default function(p, e) {
  var u = sub(p, e[0]);
  var v = sub(e[1], e[0]);
  
  //console.log(u);
  //console.log(v);
  var z = u[0]*v[1] - v[0]*u[1];
  return z >= 0;
}