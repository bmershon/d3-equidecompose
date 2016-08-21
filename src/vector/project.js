import dot from "./dot";
import scale from "./scale";

export default function(u, v) {
  return scale(dot(u, v) / dot(v, v), v);
}