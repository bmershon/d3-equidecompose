import {default as getRow} from "./getRow";
import {default as getCol} from "./getCol";
import {default as dot} from "./dot";

export default function(A, B) {
	if(A[0].length != B.length){
		console.log("invalid dimensions");
		return null;
	}
	var res = [[]];
	for(let i = 0; i < A.length; i++){
		for(let j = 0; j < B[0].length; j++){
			console.log(res);
			console.log(A);
			console.log(B);
			res[i][j] = dot(getRow(A,i),getCol(B,j));
		}
	}
	return res;
}