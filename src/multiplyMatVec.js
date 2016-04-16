import {default as row} from "./row";
import {default as dot} from "./dot";

export default function(A, b) {
  var res = [];
  for(let i = 0; i < A.length; i++){
    res[i] = dot(row(A, i), b);
  }
  return res;
}