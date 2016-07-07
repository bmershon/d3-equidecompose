import {default as decomposition} from "./decomposition";

// Takes in two meshes (triangulations).
export function mesh(source, subject) {
  return decomposition(source, subject);
}

export function polygon(source, subject) {
  // TODO: triangulate source and subject
}