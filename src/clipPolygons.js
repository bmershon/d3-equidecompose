import {default as sutherlandHodgeman} from "./sutherlandHodgeman";
import {default as orientCounterClockwise} from "./orientCounterClockwise";

/*
Given 2 lists of polygons, polygon0 and polygon1, this function computes all intersections
between the lists via the Sutherland-Hodgeman algorithm.
*/

export default function(polygon0, polygon1){
	var result = [];
	for(let i = 0; i < polygon0.length; i++){
		for(let j = 0; j < polygon1.length; j++){
			var sh = sutherlandHodgeman(orientCounterClockwise(polygon0[i]),orientCounterClockwise(polygon1[j]));
			if(sh!=[] && sh!=null && sh.length!=0 && sh[0].length!=0){
				result.push(sh);
			}
		}
	}
	return result;
}