import {default as angle} from "./angle";
import {default as add} from "./add";
import {default as sub} from "./sub";
import {default as scale} from "./scale";
import {default as project} from "./project";
import {default as intersect} from "./intersect";
import {default as degree} from "./degree";
import {polygonArea as area} from "d3-polygon";

// Input: array of triangle vertices has properties:
// transforms, parent
// Returns array of polygons with rotations and translations
// relative to parent
export default function(T) {
  var index = 0,
      A, B, C, D, E, F, G, H, M,
      BC, BA, MB, MC, ME, 
      BCFD, DGB, FCH,
      maxAngle = -Infinity;

  if (area(T) == 0) return [];

  // Find largest angle in triangle T
  for (let i = 0; i < 3; i++) {
    let theta = 0;
    theta = angle(T[i % 3], T[(i + 1) % 3], T[(i + 2) % 3]);
    if (theta > maxAngle) {
      maxAngle = theta;
      index = i;
    }
  }

  A = T[index];
  B = T[(index + 1) % 3];
  C = T[(index + 2) % 3];
  BC = sub(C, B);
  BA = sub(A, B);
  M = add(B, project(BA, BC));
  E = add(A, scale(0.5, sub(M, A)));
  MB = sub(B, M);
  MC = sub(C, M);
  ME = sub(E, M);
  G = add(M, add(MB, ME));
  H = add(M, add(MC, ME));
  D = intersect(E, G, A, B); // pivot
  F = intersect(E, H, A, C); // pivot

  BCFD = [B, C, F, D];
  DGB = [D, G, B];
  FCH = [F, C, H];

  BCFD.parent = T;
  BCFD.transform = {};
  
  DGB.parent = T;
  DGB.transform = {rotate: degree(Math.PI), pivot: D};

  FCH.parent = T;
  FCH.transform = {rotate: degree(-Math.PI), pivot: F};

  return [BCFD, DGB, FCH];
};