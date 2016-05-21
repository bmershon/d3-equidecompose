import {default as inDelta} from "./inDelta";
import {default as add} from "./add";
import {default as sub} from "./sub";
import {default as scale} from "./scale";
import {default as length} from "./length";
import {default as normalize} from "./normalize";

export default function(a, b, c, d) {
  var u = sub(b, a),
      v = sub(d, c),
      q = sub(a, c),
      denom, t, s;

  // Cramer's Rule
  denom = v[0] * (-u[1]) - (-u[0]) * v[1];
  t = (q[0] * (-u[1]) - (-u[0]) * q[1]) / (denom);
  s = (v[0] * q[1] - q[0] * v[1]) / (denom);
  
  if (0.0 <= s && s <= 1) {
    return add(c, scale(t, v));
  }
  
  return null;
}