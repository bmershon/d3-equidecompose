import {default as length} from "./length";
import {default as scale} from "./scale";

export default function(a) {
  return scale(1/length(a), a);
}