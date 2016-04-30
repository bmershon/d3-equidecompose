import polygon from "./polygon";
import {default as infiniteIntersection} from "./infiniteIntersection";
import {default as right} from "./right"
import {default as undo} from "./undo";

// Sutherland-Hodgeman algorithm for subject polygon and clip polygon.
export default function(subject, clip){
	var clipPolygon, outputList, clipped, transforms;

	clipPolygon = polygon(clip.reverse());
	outputList = subject.slice(0);

	for (let i = 0; i < clipPolygon.length; i++) {
		let end, clipEdge, inputList, S;
		
		end = (i + 1 == clipPolygon.length) ? 0 : i+1;
		clipEdge = [clipPolygon[i], clipPolygon[end]];
		inputList = outputList.slice(0);
		outputList = [];

		S = inputList[inputList.length-1]; 

		for (let j = 0; j < inputList.length; j++) {
			let E, EContains, SContains, inter;
			
			E = inputList[j];
			EContains = !right(E, clipEdge);
			SContains = !right(S, clipEdge);
			
			if (EContains){
				if (!SContains){
					inter = infiniteIntersection(E, S, clipPolygon[i], clipPolygon[end]);
					if (inter != []){
						outputList.push(inter);
					}
				}
				outputList.push(E);
			} else if (SContains) {
				inter = infiniteIntersection(E, S, clipPolygon[i], clipPolygon[end]);
				if(inter != []){
					outputList.push(inter);
				}
			}

			S = E;
		}
	}

	clipped = polygon(outputList);
	transforms = subject.transforms;
	transforms.concat(clip.transforms.slice(0).reverse().map(undo));
	[].push.apply(clipped.transforms, subject.transforms);

	return clipped;
}