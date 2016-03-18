import {default as inDelta} from "./inDelta";
import {default as add} from "./add";
import {default as sub} from "./sub";
import {default as scale} from "./scale";
import {default as length} from "./length";
import {default as normalize} from "./normalize";

// Returns point of intersection of AB and CD
// or null if segments do not intersect.
export default function(a, b, c, d) {
  var u = sub(b, a),
      v = sub(d, c),
      q = sub(c, a),
      denom,
      s, t;

  // Cramer's Rule
  denom = u[0] * (-v[1]) - (-v[0]) * u[1];
  s = (q[0] * (-v[1]) - (-v[0]) * q[1]) / (denom);
  t = (u[0] * q[1] - q[0] * u[1]) / (denom);

  return (inDelta(s, 0.5, 0.5) && inDelta(t, 0.5, 0.5))
        ? add(a, scale(s, u))
        : null;
}