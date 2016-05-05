import {default as row} from "./row";
import {default as dot} from "./dot";

// Multiplies matrix A by vector b.
export default function(A, b) {
  var res = [],
      x = b.slice();

  // pad for homogenous coordinates
  for (let i = 0; i < 3 - b.length; i++) {
    x.push(1);
  }

  for(let i = 0; i < A.length; i++){
    res[i] = dot(row(A, i), x);
  }

  return res;
}