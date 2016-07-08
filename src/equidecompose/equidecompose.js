import {default as decomposition} from "./decomposition";

// Takes in two meshes (triangulations), 
// scales the subject as necessary, and
// returns a decomposition object.
export function equidecomposeMesh(source, subject) {
  return decomposition(source, subject);
}

// Takes in two simple polygons, triangulates each,
// scales the subject as necessary, and returns 
// a decomposition object.
export function equidecomposePolygon(source, subject) {
  // TODO: triangulate source and subject
  return decomposition(source, subject);
}