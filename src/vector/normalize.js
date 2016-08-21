import length from "./length";
import scale from "./scale";

export default function(a) {
  return scale(1 / length(a), a);
}