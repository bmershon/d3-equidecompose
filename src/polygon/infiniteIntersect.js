import {default as add} from "../vector/add";
import {default as sub} from "../vector/sub";
import {default as scale} from "../vector/scale";

var infinity = [1e12, 1e12];

//  Returns point of intersection of AB and CD,
//  possibly occuring at infinity.
export default function(a, b, c, d) {
  var u = sub(b, a),
      v = sub(d, c),
      q = sub(c, a),
      denom, s;

  // Cramer's Rule
  denom = u[0] * (-v[1]) - (-v[0]) * u[1];
  
  // Check for parallel lines
  if (denom === 0) return [infinity, infinity];

  s = (q[0] * (-v[1]) - (-v[0]) * q[1]) / (denom);

  return add(a, scale(s, u));
}