import {default as rotation} from "./rotation";
import {default as identity} from "./identity";
import {default as translation} from "./translation";
import {default as angle} from "./angle";
import {default as add} from "./add";
import {default as sub} from "./sub";
import {default as triangle2Rectangle} from "./triangle2Rectangle";
import {default as rectangle2Square} from "./rectangle2Square";
import {default as clipCollection} from "./clipCollection";
import {polygonCentroid} from "d3-polygon";
import polygon from "./polygon";

/*
  Takes in a source and and a subject triangle;
*/
export default function(source, subject) {
  var A, B, squareA, squareB, clipped, cA, cB;

  // TODO rescale subject triangle about centroid in the case that
  // its area is not equal to that of the source triangle

  A = rectangle2Square(triangle2Rectangle(source));
  B = rectangle2Square(triangle2Rectangle(subject));
  squareA = polygon(A.square);
  squareB = polygon(B.square);

  cA = polygonCentroid(squareA);
  cB = polygonCentroid(squareB);

  // center collection B on collection A 
  B.forEach(function(d) {
    d.translate([(cA[0] - cB[0]), (cA[1] - cB[1])]);
    d.transforms.push({
      translate: [-(cA[0] - cB[0]), -(cA[1] - cB[1])],
      type: "alignment"
    });
    d.rotate(theta(squareA, squareB), cA);
    d.transforms.push({
      rotate: -theta(squareA, squareB),
      pivot: cA,
      type: "alignment"
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

function theta(P, Q) {
  var a, b;

  a = P[0];
  b = add(Q[0], sub(P.centroid(), Q.centroid()));

  return 180 / Math.PI * angle(P.centroid(), a, b);
}