import dot from "../vector/dot";
import row from "./row";

// Multiplies matrix A by vector b and returns the resulting vector.
export default function(A, b) {
  var res = [],
      i,
      x = b.slice();

  // Pad for homogenous coordinates.
  for (i = 0; i < 3 - b.length; i++) {
    x.push(1);
  }

  for(i = 0; i < A.length; i++){
    res[i] = dot(row(A, i), x);
  }

  return res;
}