import {default as sub} from "./sub";
import {default as length} from "./length";
import {default as normalize} from "./normalize";
import {default as intersect} from "./intersect";
import {default as scale} from "./scale";
import {default as add} from "./add";
import {default as polygonTranslate} from "./polygonTranslate";
import {polygonArea, polygonCentroid, polygonContains} from "d3-polygon";
import {default as cutCollection} from "./cutCollection";

// Takes in array of polygons forming a canonical rectangle
export default function(collection) {
  var dist = [],
      A, B, C, D, E, F, G, H, J, K, // follows Tralie's labeling
      AFGD, KCF,
      area, s,
      rectangle = collection.rectangle, // bounding rectangle
      square,
      polygons = [],
      ε = 1e-2;

  area = Math.abs(polygonArea(rectangle));
  s = Math.sqrt(area); // square side length

  // TODO: Trim collection of polygons (rectangle)
  // such that width < 2 * square dimension
  // update collection.rectangle accordingly

  // assumes escalator conditions hold
  B = rectangle[0]; // rectangle CCW order
  E = rectangle[3];
  F = rectangle[1];
  G = rectangle[2];

  A = add(B, scale(s, normalize(sub(E, B))));
  C = add(B, scale(s, normalize(sub(F, B))));
  D = add(A, sub(C, B));
  J = intersect(A, F, E, G);
  K = intersect(A, F, D, C)
  KCF = [K, C, F]; // used to locate elevator pieces
  AFGD = [A, F, G, D];

  polygons = cutCollection(D, add(C, scale(1, sub(C, D))), collection);
  polygons = cutCollection(A, F, polygons);

  // slide new polygons using elevator method
  polygons.forEach(function(d) {
    var centroid, T;

    centroid = polygonCentroid(d);

    if (polygonContains(KCF, centroid)) {
      T = sub(A, K);
      polygonTranslate(d, T);
      d.transform = {translate: scale(-1, T)};
    } else if (polygonContains(AFGD, centroid)) {
      T = sub(A, J);
      polygonTranslate(d, T);
      d.transform = {translate: scale(-1, T)};
    }
  });

  square = [A, B, C, D];
  polygons.square = square;

  return polygons;
};