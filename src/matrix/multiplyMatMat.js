import column from "./column";
import dot from "../vector/dot";
import row from "./row";

// Multiplies matrix A by matrix B and returns the resulting matrix.
export default function(A, B) {
  var i, j,
      res = [[0, 0, 0],
             [0, 0, 0],
             [0, 0, 0]];
      
  if(A[0].length != B.length){
    throw new Error("invalid dimensions");
  }

  for(i = 0; i < A.length; i++){
    for(j = 0; j < B[0].length; j++){
      res[i][j] = dot(row(A, i), column(B, j));
    }
  }

  return res;
}