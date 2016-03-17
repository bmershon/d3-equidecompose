import {default as angle} from "./angle";
import {default as add} from "./add";
import {default as sub} from "./sub";
import {default as scale} from "./scale";
import {default as project} from "./project";
import {default as intersect} from "./intersect";

// Takes array of triangle vertices and returns
// its "canonical" rectangle as an array of polygons
export default function(T) {
  var index = 0,
      A, B, C, D, E, F, G, H, M,
      BC, BA, MB, MC, ME,
      maxAngle = -Infinity;

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
  D = intersect(E, G, A, B);
  F = intersect(E, H, A, C);

  return [[B, D, G], [B, C, F, D], [C, H, F]];
};
