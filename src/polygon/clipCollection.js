import ccw from "./counterclockwise";
import clipPolygon from "./clipPolygon";

// Takes in arrays of polygons and returns intersection between the
// collections using the Sutherland-Hodgeman algorithm.
export default function(A, B){
  var result = [], clipped, i, j;

  // Clip every polygon in A against every polygon in B.
  for (i = 0; i < A.length; i++) {
    for (j = 0; j < B.length; j++) {
      clipped = clipPolygon(ccw(A[i]), ccw(B[j]));
      if (clipped.length != 0) result.push(clipped);
    } 
  }

  return result;
}