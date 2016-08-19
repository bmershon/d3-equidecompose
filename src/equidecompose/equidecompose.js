import {default as decomposition} from "./decomposition";
import {default as triangulate} from "../geom/triangulate.js";

export function equidecompose(source, subject) {
  return decomposition(triangulate(source), triangulate(subject));  
}

export function equidecomposeMesh(source, subject) {
  return decomposition(source, subject);
}