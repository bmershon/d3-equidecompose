import {default as sutherlandHodgeman} from "./sutherlandHodgeman";

export default function(polygon0, polygon1){
	var result = [];
	for(let i = 0; i < polygon0.length; i++){
		for(let j = 0; j < polygon1.length; j++){
			var sh = sutherlandHodgeman(polygon0[i],polygon1[j]);
			if(sh!=[] && sh!=null){
				result.push(sh);
			}
		}
	}
	return result;
}