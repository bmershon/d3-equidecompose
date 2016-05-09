import {default as rotation} from "./rotation";
import {default as identity} from "./identity";
import {default as translation} from "./translation";
import {default as angle} from "./angle";
import {default as add} from "./add";
import {default as sub} from "./sub";
import {default as scale} from "./scale";
import {default as length} from "./length";
import {default as cross} from "./cross";
import degree from "./degree";
import {default as triangle2Rectangle} from "./triangle2Rectangle";
import {default as rectangle2Square} from "./rectangle2Square";
import {default as clipCollection} from "./clipCollection";
import polygon from "./polygon";

export default function(source, subject) {
  var A, B,
      squareA, squareB,
      centroid, target, T,
      clipped, T, theta, direction,
      i, j, distance, min = Infinity;

  // TODO: rescale subject triangle about centroid in the case that
  // its area is not equal to that of the source triangle

  A = rectangle2Square(triangle2Rectangle(source));
  B = rectangle2Square(triangle2Rectangle(subject));
  squareA = polygon(A.square);
  squareB = polygon(B.square);
  centroid = squareA.centroid();
  target = squareB.centroid();
  T = [(centroid[0] - target[0]), (centroid[1] - target[1])];
  squareB = squareB.clone().translate(T);

  // find nearest vertex coorespondence in Q for first vertex in P
  for (i = 0, j = 0; i < 4; i++) {
    distance = length(sub(squareA[0], squareB[i]));
    if (distance < min) {
      min = distance;
      j = i;
    }
  }

  // rotate through a minimal angle, in the correct direction
  direction = cross(centroid, squareB[j], squareA[0])[2] > 0 ? 1 : -1;
  theta = direction * degree(angle(centroid, squareB[j], squareA[0]));

  // center collection B on collection A 
  B.forEach(function(d) {
    d.translate(T);
    d.transforms.push({
      translate: scale(-1, T),
    });
    d.rotate(theta, centroid);
    d.transforms.push({
      rotate: -theta,
      pivot: centroid,
    });
  });

  clipped = clipCollection(A, B);

  clipped = clipped.map(function(d) {
    var p = d.clone();
    p.transforms = d.target;
    p = p.origin(); // place in subject triangle
    p.transforms = d.transforms; // restore joined transform history
    return p;
  });

  return clipped;
};