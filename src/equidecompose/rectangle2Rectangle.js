import {default as sub} from "../vector/sub";
import {default as length} from "../vector/length";
import {default as normalize} from "../vector/normalize";
import {default as scale} from "../vector/scale";
import {default as add} from "../vector/add";
import {default as intersect} from "../geom/intersect";
import {default as cutCollection} from "../geom/cutCollection";
import {polygonArea, polygonCentroid, polygonContains} from "d3-polygon";

// Takes in a collection of polygons forming a rectangle and produces
// a new collection forming a rectangle of the given width.
export default function(collection, width) {
  var A, B, C, D, E, F, G, J, K, // follows Tralie's labeling
      AFGD, KCF,
      area, height,
      rectangle = collection.rectangle, // bounding rectangle
      l = Infinity,
      polygons = [],
      i, n, a, b, left, halved, slideLeft, slideUp,
      E_Polygon, E_Vertex, F_Polygon, F_Vertex,
      centroid;

  area = Math.abs(polygonArea(rectangle));
  height = area / width; // square side length

  // Bounding rectangle for incoming collection.
  B = rectangle[0];
  F = rectangle[1];
  G = rectangle[2];
  E = rectangle[3]; 

  l = length(sub(B, F));

  if (width > l) {
    width = height;
    height = area / width;
  }

  // The rectangle to be produced, defined by [A, B, C, D].
  A = add(B, scale(height, normalize(sub(E, B))));
  C = add(B, scale(width, normalize(sub(F, B))));
  D = add(A, sub(C, B));


  // halving the canonical rectangle for the escalator method
  while (l > 2 * width) {
    E_Polygon = [], E_Vertex = [], F_Polygon = [], F_Vertex = [];

    a = add(A, scale(0.5, sub(F, B))); 
    b = add(B, scale(0.5, sub(F, B)));
    l = length(sub(b, F));

    left = [A, B, b, a];

    // "overshoot" cut segment endpoints to ensure intersection
    halved = cutCollection(a, add(b, sub(C, D)), collection);

    slideUp = sub(E, B);
    slideLeft = sub(B, b);

    // translate polgons resulting from the cut (i.e., "stacking the two halves")
    halved.forEach(function(d, j) {
      centroid = polygonCentroid(d);

      // update exact references to vertices used in exact intersections
      d.forEach(function(V, k) { // scan vertices
        if (Object.is(E, V)) {
          E_Polygon.push(j);
          E_Vertex.push(k);
        } else if (Object.is(F, V)) {
          F_Polygon.push(j);
          F_Vertex.push(k);
        }
      });

      if (polygonContains(left, centroid)) { // slide "up"
        d.translate(slideUp).transforms.push({translate: scale(-1, slideUp)}); // undo translate
      } else { // slide "left"
        d.translate(slideLeft).transforms.push({translate: scale(-1, slideLeft)}); // undo translate
      }
    });

    E = halved[E_Polygon[0]][E_Vertex[0]];
    F = halved[F_Polygon[0]][F_Vertex[0]];

    // Make all vertices at F share the same reference.
    for (i = 1, n = F_Vertex.length; i < n; i++) {
      F = halved[F_Polygon[i]][F_Vertex[i]] = halved[F_Polygon[i - 1]][F_Vertex[i - 1]]; 
    }

    collection = halved;
  }
  
  polygons = collection;

  // The "elevator method" assumes rectangle length < (2 x square height).
  G = add(F, sub(E, B));
  J = intersect(A, F, E, G);
  K = intersect(A, F, D, C);
  KCF = [K, C, F]; // used to locate elevator pieces
  AFGD = [A, F, G, D];

  polygons = cutCollection(A, F, polygons);
  polygons = cutCollection(D, add(C, scale(1, sub(C, D))), polygons);

  // Slide new polygons using elevator method.
  polygons.forEach(function(d) {
    var centroid, T;

    centroid = polygonCentroid(d);

    if (polygonContains(KCF, centroid)) {
      T = sub(A, K);
      d.translate(T).transforms.push({translate: scale(-1, T)});
    } else if (polygonContains(AFGD, centroid)) {
      T = sub(A, J);
      d.translate(T).transforms.push({translate: scale(-1, T)});
    }
  });

  polygons.rectangle = (isWide([B, C, D, A]))
                      ? [B, C, D, A]
                      : [C, D, A, B];

  return polygons;
}

// Assumes BCDA orientation, where a rectangle is wide if 
// side BC is longer than BA.
function isWide(rectangle) {
  var A = rectangle[3],
      B = rectangle[0],
      C = rectangle[1];

  return length(sub(B, C)) > length(sub(B, A));
}