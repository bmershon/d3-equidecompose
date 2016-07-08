import {default as decomposition} from "./decomposition";
import {default as earcut} from "../triangulation/earcut.js";

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
  return decomposition(earcut.flatten(source), earcut.flatten(subject));
}