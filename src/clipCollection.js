import {default as clipPolygon} from "./clipPolygon";
import {default as counterClockwise} from "./counterClockwise";


//  Takes in arrays of polygons and returns intersection between the
//  collections using the Sutherland-Hodgeman algorithm.
export default function(A, B){
  var result = [], clipped, i, j;

  // clip every polygon in A against every polygon in B
  for (i = 0; i < A.length; i++) {
    for (j = 0; j < B.length; j++) {
      clipped = clipPolygon(counterClockwise(A[i]), counterClockwise(B[j]));
      if (clipped != null && clipped.length != 0 && clipped[0].length != 0){
        result.push(clipped);
      }
    }
  }

  return result;
}