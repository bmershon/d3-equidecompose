import {default as cutPolygon} from "./cutPolygon";

export default function(a, b, collection) {
  var N = collection.length,
      indices = [],
      polygons = [],
      P, generated,
      i;

  for (i = 0; i < N; i++) {
    P = collection[i];
    generated = cutPolygon(a, b, P);

    if (generated.length == 2) {
      [].push.apply(polygons, generated);
      indices.push(i);
    }
  }

  // include polygons that were not cut into two new polygons
  polygons = polygons.concat(collection.filter(function(d, i) {
    return indices.indexOf(i) === -1;
  }));

  return polygons;
};