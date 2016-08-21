import {default as angle} from "../vector/angle";
import {default as add} from "../vector/add";
import {default as sub} from "../vector/sub";
import {default as scale} from "../vector/scale";
import {default as project} from "../vector/project";
import {default as intersect} from "../polygon/intersect";
import {default as degree} from "../matrix/degree";
import polygon from "../polygon/polygon";
import {polygonArea as area} from "d3-polygon";

export default function(P) {
  var index = 0,
      A, B, C, D, E, F, G, H, M,
      BC, BA, MB, MC, ME, 
      BCFD, DGB, FCH,
      maxAngle = -Infinity,
      polygons,
      theta, i;

  if (area(P) == 0) return [];

  // Find largest angle in triangle T
  for (i = 0; i < 3; i++) {
    theta = 0;
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
}