import {default as sutherlandHodgeman} from "./sutherlandHodgeman";
import {default as orientCounterClockwise} from "./orientCounterClockwise";

export default function(polygon0, polygon1){
	var result = [];
	for(let i = 0; i < polygon0.length; i++){
		for(let j = 0; j < polygon1.length; j++){
			var sh = sutherlandHodgeman(orientCounterClockwise(polygon0[i]),orientCounterClockwise(polygon1[j]));
			if(sh!=[] && sh!=null){
				result.push(sh);
			}
		}
	}
	return result;
}