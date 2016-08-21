import {default as decomposition} from "./decomposition";
import {default as triangulate} from "../polygon/triangulate.js";

export function equidecompose(source, subject) {
  return decomposition(orient(triangulate(source)), orient(triangulate(subject)));  
}

function orient(triangles) {
  // Earcut produces triangles with clockwise winding: reverse.
  return triangles.map(function(d) { return d.reverse(); });
}