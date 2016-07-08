import {default as decomposition} from "./decomposition";
import {default as triangulate} from "../geom/triangulate.js";

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
  return decomposition(triangulate(source), triangulate(subject));  
}
