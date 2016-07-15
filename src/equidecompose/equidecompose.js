import {default as decomposition} from "./decomposition";
import {default as triangulate} from "../geom/triangulate.js";

// Takes in two simple polygons, triangulates each,
// scales the subject as necessary, and returns 
// a decomposition object.
export function equidecompose(source, subject) {
  return decomposition(triangulate(source), triangulate(subject));  
}

// Takes in two collections of triangles (triangulations), 
// scales the subject as necessary, and
// returns a decomposition object.
export function equidecomposeMesh(source, subject) {
  return decomposition(source, subject);
}

export function equidecomposeTopology(source, subject) {
  // TODO 
  return decomposition(source, subject);
}
