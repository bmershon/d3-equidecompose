import {default as cutPolygon} from "./cutPolygon";

/*
  Returns array of polygons resulting from cutting
  convex polygons in the collection by segment ab.
  Polygons that are cut are removed from the collection;
  polygons that not cut are returned along with the new polygons.
*/
export default function(a, b, collection) {
  var N = collection.length,
      indices = [],
      polygons = [];

  for (let i = 0; i < N; i++) {
    let P = collection[i],
        generated;

    generated = cutPolygon(a, b, P);

    if (generated.length == 2) {
      [].push.apply(polygons, generated);
      indices.push(i);
    }
  }

  // include polygons that were not cut into two new polygons
  polygons = polygons.concat(collection.filter(function(d, i) {
    return !indices.includes(i);
  }));

  return polygons;
};