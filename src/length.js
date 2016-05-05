import {default as dot} from "./dot";

export default function length(u) {
  return Math.sqrt(dot(u,u));
}