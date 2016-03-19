import {default as length} from "./length";
import {default as dot} from "./dot";

// Returns angle in radians between BA and AC, where
// a, b, c are specified in counter-clockwise order
export default function(a, b, c) {
  var u = [b[0] - a[0], b[1] - a[1]],
      v = [c[0] - a[0], c[1] - a[1]];

  return Math.acos(dot(u, v) / (length(u) * length(v)));
}