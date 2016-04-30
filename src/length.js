import {default as dot} from "./dot";

/*
Computes the length of vector u.
*/

export default function length(u) {
  return Math.sqrt(dot(u,u));
}