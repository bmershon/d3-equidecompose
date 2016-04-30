import {default as clipPolygon} from "./clipPolygon";
import {default as CCW} from "./CCW";

/*
	Takes in arrays of polygons A and B and returns all intersections
 	between the two collections using the Sutherland-Hodgeman algorithm.
*/
export default function(A, B){
	var result = [];

	for (let i = 0; i < A.length; i++) {
		for (let j = 0; j < B.length; j++) {
			var sh = clipPolygon(CCW(A[i]), CCW(B[j]));
			if (sh != [] && sh!=null && sh.length != 0 && sh[0].length != 0){
				result.push(sh);
			}
		}
	}
	return result;
}