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
      p, v, q, w,
      l = Infinity,
      polygons = [];

  area = Math.abs(polygonArea(rectangle));
  s = Math.sqrt(area); // square side length

  // assumes escalator conditions hold
  B = rectangle[0]; // rectangle CCW order
  E = rectangle[3];
  F = rectangle[1];
  G = rectangle[2];

  // the square defined by [A, B, C, D]
  A = add(B, scale(s, normalize(sub(E, B))));
  C = add(B, scale(s, normalize(sub(F, B))));
  D = add(A, sub(C, B));

  l = length(sub(B, F));

  // halving the canonical rectangle for the escalator method
  while (l > 2 * s) {
    let a, b, left, halved, slideLeft, slideUp;

    a = add(A, scale(0.5, sub(F, B))); 
    b = add(B, scale(0.5, sub(F, B)));
    l = length(sub(b, F));

    left = [A, B, b, a];

    // "overshoot" cut segment endpoints to ensure intersection
    halved = cutCollection(a, add(b, sub(C, D)), collection);

    slideUp = sub(G, F);
    slideLeft = sub(B, b);

    halved.forEach(function(d, j) {
      var centroid, T;
      centroid = polygonCentroid(d);

      // update exact references to vertices used in exact intersections
      d.forEach(function(V, k) { // scan vertices
        if (Object.is(F, V)) {
          p = j;
          v = k;
        } else if (Object.is(G, V)) {
          q = j;
          w = k;
        }
      });

      if (polygonContains(left, centroid)) { // slide "up"
        d.translate(slideUp).transforms.push({translate: scale(-1, slideUp)}); // undo translate
      } else { // slide "left"
        d.translate(slideLeft).transforms.push({translate: scale(-1, slideUp)}); // undo translate
      }
    });

    F = halved[p][v]; // updated position after transform
    G = halved[q][w];

    collection = halved;
  }

  polygons = collection;

  J = intersect(A, F, E, G);
  K = intersect(A, F, D, C)
  KCF = [K, C, F]; // used to locate elevator pieces
  AFGD = [A, F, G, D];

  polygons = cutCollection(D, add(C, scale(1, sub(C, D))), collection);
  polygons = cutCollection(A, F, polygons);

  // slide new polygons using elevator method
  polygons.forEach(function(d) {
    var centroid, T, P;

    centroid = polygonCentroid(d);

    if (polygonContains(KCF, centroid)) {
      T = sub(A, K);
      d.translate(T).transforms.push({translate: scale(-1, T)});
    } else if (polygonContains(AFGD, centroid)) {
      T = sub(A, J);
      d.translate(T).transforms.push({translate: scale(-1, T)});
    }
  });

  square = [A, B, C, D];
  polygons.square = square;

  return polygons;
};