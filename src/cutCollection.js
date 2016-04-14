import {default as cutPolygon} from "./cutPolygon";

// Return array of polygons resulting from cutting
// convex polygons in the collection by segment ab
export default function(a, b, collection) {
  var N = collection.length,
      indices = [],
      polygons = [];

  for (let i = 0; i < N; i++) {
    let P = collection[i],
        generated;

    generated = cutPolygon(a, b, P);

    if (generated.length == 2) {
      Array.prototype.push.apply(polygons, generated);
      indices.push(i);
    }
  }

  // include polygons that were not cut into two new polygons
  polygons = polygons.concat(collection.filter(function(d, i) {
    return !indices.includes(i);
  }));

  return polygons;
};