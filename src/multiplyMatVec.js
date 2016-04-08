import {default as getRow} from "./getRow";
import {default as dot} from "./dot";

export default function(A, b) {
	var res = [];
	for(let i = 0; i < A.length; i++){
		res[i] = dot(getRow(A,i),b);
	}
	return res;
}