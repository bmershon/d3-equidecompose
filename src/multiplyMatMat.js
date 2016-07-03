import {default as row} from "./row";
import {default as column} from "./column";
import {default as dot} from "./dot";

//  Multiplies matrix A by matrix B.
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