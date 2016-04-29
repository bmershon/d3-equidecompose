import {default as sub} from "./sub";
import {default as length} from "./length"

export default function(a,b,c){
	var x = length(sub(b,a));
	var y = length(sub(c,a));
	var z = length(sub(b,c));
	var s = 0.5*(x+y+z);
	return Math.sqrt(s*(s-a)*(s-b)*(s-c));
}