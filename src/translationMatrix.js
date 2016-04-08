import {default as identity} from "./identity";

export default function(delta) {
	var dx = delta[0];
	var dy = delta[1];
	var res = identity(3);
	res[0][2] = dx;
	res[1][2] = dy;
	return res;
}