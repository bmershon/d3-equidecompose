import {default as dot} from "./dot";
import {default as scale} from "./scale";

export default function(u, v) {
  return scale(dot(u, v) / dot(v, v), v);
}