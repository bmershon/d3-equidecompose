import add from "../vector/add";
import scale from "../vector/scale";
import sub from "../vector/sub";
import inDelta from "./inDelta";

//  Returns point of intersection of AB and CD 
//  or null if segments do not intersect.
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

  return (inDelta(s, 0.5, 0.5 + epsilon) && inDelta(t, 0.5, 0.5 + epsilon))
        ? add(a, scale(s, u))
        : null;
}