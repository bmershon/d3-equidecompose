import dot from "./dot";
import length from "./length";
import normalize from "./normalize";

// Returns angle in radians between AB and AC, where a, b, c
// are specified in counter-clockwise order.
export default function(a, b, c) {
  var u = normalize([b[0] - a[0], b[1] - a[1]]),
      v = normalize([c[0] - a[0], c[1] - a[1]]);

  if ((length(u) * length(v)) == 0) return 0;

  return Math.acos(dot(u, v));
}