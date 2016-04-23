import {default as sub} from "./sub";
import {default as length} from "./length";
import {default as normalize} from "./normalize";
import {default as intersect} from "./intersect";
import {default as scale} from "./scale";
import {default as add} from "./add";
import {polygonArea, polygonCentroid, polygonContains} from "d3-polygon";
import polygon from "./polygon";
import {default as cutCollection} from "./cutCollection";

// Takes in array of polygons forming a canonical rectangle
export default function(collection) {
  var dist = [],
      A, B, C, D, E, F, G, H, J, K, // follows Tralie's labeling
      AFGD, KCF,
      area, s,
      rectangle = collection.rectangle, // bounding rectangle
      square,
      l = Infinity,
      polygons = [];

  area = Math.abs(polygonArea(rectangle));
  s = Math.sqrt(area); // square side length

  // assumes escalator conditions hold
  B = rectangle[0]; // rectangle CCW order
  E = rectangle[3];
  F = rectangle[1];
  G = rectangle[2];

  // the square
  A = add(B, scale(s, normalize(sub(E, B))));
  C = add(B, scale(s, normalize(sub(F, B))));
  D = add(A, sub(C, B));

  l = length(sub(B, F));
  console.log("original", l)
  // halving the canonical rectangle for the escalator method
  while (l > 2 * s) {
    let a, b, left, halved;

    a = add(E, scale(0.5, sub(G, E))); 
    b = add(B, scale(0.5, sub(F, B)));
    l = length(sub(b, F));

    console.log("chopped:", l, 2 * s)

    left = [A, B, b, a];

    // "overshoot" cut segment endpoints to ensure intersection
    halved = cutCollection(add(a, sub(D, C)), add(b, sub(C, D)), collection);

    halved.forEach(function(d) {
      var centroid, T;

      centroid = polygonCentroid(d);

      if (polygonContains(left, centroid)) { // slide "up"
        T = sub(E, B); 
        d.translate(T);
        d.transforms.push({translate: scale(-1, T)}); // undo translate
      } else { // slide "left"
        T = sub(B, b); // translate into position
        d.translate(T);
        d.transforms.push({translate: scale(-1, T)}); // undo translate
      }
    });

    square = [a, b]; //final cut

    collection = halved;
  }

  polygons = collection;
  
  // J = intersect(A, F, E, G);
  // K = intersect(A, F, D, C)
  // KCF = [K, C, F]; // used to locate elevator pieces
  // AFGD = [A, F, G, D];

  // polygons = cutCollection(D, add(C, scale(1, sub(C, D))), collection);
  // polygons = cutCollection(A, F, polygons);

  // // slide new polygons using elevator method
  // polygons.forEach(function(d) {
  //   var centroid, T, P;

  //   centroid = polygonCentroid(d);

  //   if (polygonContains(KCF, centroid)) {
  //     T = sub(A, K);
  //     d.translate(T);
  //     d.transforms.push({translate: scale(-1, T)});
  //   } else if (polygonContains(AFGD, centroid)) {
  //     T = sub(A, J);
  //     d.translate(T);
  //     d.transforms.push({translate: scale(-1, T)});
  //   }
  // });

  // square = [A, B, C, D];
  polygons.square = square;

  return polygons;
};