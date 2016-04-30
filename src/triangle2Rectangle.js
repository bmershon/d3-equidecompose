import {default as angle} from "./angle";
import {default as add} from "./add";
import {default as sub} from "./sub";
import {default as scale} from "./scale";
import {default as project} from "./project";
import {default as intersect} from "./intersect";
import {default as degree} from "./degree";
import polygon from "./polygon";
import {polygonArea as area} from "d3-polygon";

/* 
  Takes in array of triangle vertices has properties:
  { transforms, parent }
  
  Returns array of polygons with rotations and translations
  relative to parent.
*/   
export default function(P) {
  var index = 0,
      A, B, C, D, E, F, G, H, M,
      BC, BA, MB, MC, ME, 
      BCFD, DGB, FCH,
      maxAngle = -Infinity,
      rectangle,
      polygons;

  if (area(P) == 0) return [];

  // Find largest angle in triangle T
  for (let i = 0; i < 3; i++) {
    let theta = 0;
    theta = angle(P[i % 3], P[(i + 1) % 3], P[(i + 2) % 3]);
    if (theta > maxAngle) {
      maxAngle = theta;
      index = i;
    }
  }

  A = P[index];
  B = P[(index + 1) % 3];
  C = P[(index + 2) % 3];
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

  BCFD = polygon([B, C, F, D]);
  DGB = polygon([D, G, B]);
  FCH = polygon([F, C, H]);

  // transforms to return polygons to previous positions
  DGB.transforms.push({rotate: degree(Math.PI), pivot: D});
  FCH.transforms.push({rotate: degree(-Math.PI), pivot: F});

  polygons = [BCFD, DGB, FCH];

  polygons.rectangle = [B, C, H, G];

  return polygons;
};