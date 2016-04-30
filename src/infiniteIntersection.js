import {default as inDelta} from "./inDelta";
import {default as add} from "./add";
import {default as sub} from "./sub";
import {default as scale} from "./scale";
import {default as length} from "./length";
import {default as normalize} from "./normalize";

// Returns point of intersection of segment ab and line cd
// or null if segments do not intersect.
export default function(a, b, c, d) {
  var u = sub(b, a);
  var v = sub(d, c);
  var q = sub(a, c);

  // Cramer's Rule
  var denom = v[0] * (-u[1]) - (-u[0]) * v[1];
  var t = (q[0] * (-u[1]) - (-u[0]) * q[1]) / (denom);
  var s = (v[0] * q[1] - q[0] * v[1]) / (denom);
  if(0.0 <= s && s <= 1){
  	return add(c,scale(t,v));
  }
  return [];
}