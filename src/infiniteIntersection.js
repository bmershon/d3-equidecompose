import {default as inDelta} from "./inDelta";
import {default as add} from "./add";
import {default as sub} from "./sub";
import {default as scale} from "./scale";
import {default as length} from "./length";
import {default as normalize} from "./normalize";

export default function(a, b, c, d) {
  var u = sub(b, a),
      v = sub(d, c),
      q = sub(c, a),
      denom, s, t,
      epsilon = 0.0;

  // Cramer's Rule
  denom = u[0] * (-v[1]) - (-v[0]) * u[1];
  s = (q[0] * (-v[1]) - (-v[0]) * q[1]) / (denom);
  t = (u[0] * q[1] - q[0] * u[1]) / (denom);

  console.log(s, t);

  return (inDelta(s, 0.5, 0.5 + epsilon) && inDelta(t, 0.5, 0.5 + Infinity))
        ? add(a, scale(s, u))
        : null;
}