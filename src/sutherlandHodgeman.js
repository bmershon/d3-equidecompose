import polygon from "./polygon";
import {default as infiniteIntersection} from "./infiniteIntersection";
import {default as right} from "./right"


/*
Sutherland-Hodgeman algorithm for subject polygon and clip.
*/

export default function(subject, clip){
	var subjectPolygons = polygon(subject);
	var clipPolygon = polygon(clip);
	var clipPolygon = polygon(clip.reverse());
	var outputList = subjectPolygons.slice(0);
	for(let i = 0; i < clipPolygon.length; i++){
		var end = (i+1 == clipPolygon.length) ? 0 : i+1;
		var clipEdge = [clipPolygon[i],clipPolygon[end]];
		var inputList = outputList.slice(0);
		outputList = [];
		var S = inputList[inputList.length-1]; 
		for(let j = 0; j < inputList.length; j++){
			var E = inputList[j];
			var EContains = !right(E,clipEdge);
			var SContains = !right(S,clipEdge);
			if(EContains){
				if(!SContains){
					var inter = infiniteIntersection(E,S,clipPolygon[i],clipPolygon[end]);
					if(inter!=[]){
						outputList.push(inter);
					}
				}
				outputList.push(E);
			}
			else if(SContains){
				var inter = infiniteIntersection(E,S,clipPolygon[i],clipPolygon[end]);
				if(inter!=[]){
					outputList.push(inter);
				}
			}
			S = E;
		}
	}
	return outputList;
}