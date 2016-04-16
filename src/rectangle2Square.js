import {default as sub} from "./sub";
import {default as length} from "./length";
import {default as normalize} from "./normalize";
import {default as scale} from "./scale";
import {default as add} from "./add";
import {polygonArea} from "d3-polygon";
import {default as cutCollection} from "./cutCollection";

// Takes in array of polygons forming a canonical rectangle
export default function(collection) {
  var dist = [],
      A, B, C, D, M1, M2,
      area, s,
      rectangle = collection.rectangle, // bounding rectangle
      square,
      polygons = [],
      epsilon = 1e-4;

  A = rectangle[0]; // CCW: ABCD
  B = rectangle[1];
  C = rectangle[2];
  D = rectangle[3];

  area = Math.abs(polygonArea(rectangle));
  s = Math.sqrt(area); // square side length

  // assumes escalator conditions hold
  M1 = add(A, scale(s, normalize(sub(D, A))));
  M2 = B;
  console.debug(M1, M2, collection[0])
  square = [M1, M2];

  polygons = cutCollection(M1, M2, collection);
  polygons.square = square;

  return polygons;
};