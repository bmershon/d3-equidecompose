import {default as length} from "./length";
import {default as dot} from "./dot";

//  Returns angle in radians between AB and AC, where
//  a, b, c are specified in counter-clockwise order.
export default function(a, b, c) {
  var u = [b[0] - a[0], b[1] - a[1]],
      v = [c[0] - a[0], c[1] - a[1]];

  if ((length(u) * length(v)) == 0) return 0;

  return Math.acos(Math.max(Math.min(1, dot(u, v) / (length(u) * length(v))), -1));
}