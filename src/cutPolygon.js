import {default as intersect} from "./intersect";

// Return array of polygons resulting from cutting
// convex polygon P by segment ab
export default function(a, b, P) {
  var n = P.length,
      start,
      end,
      _P = [],
      P_ = [],
      points = [],
      e, 
      f = P[n - 1],
      bounds = [],
      i = -1,
      rectangle,
      polygons = [];

  // walk through polygon edges, attempting intersections
  // with exact vertices or line segments
  while (++i < n) {
    let x;

    e = f;
    f = P[i];

    // compare floating-point positions by reference
    if      (a === e || b === e) 
      x = e;
    else if (a === f || b === f)
      x = f;
    else
      x = intersect(a, b, e, f);

    if (!x) continue; // no intersection
    if (points.length == 2) break;

    points.push(x);
    bounds.push(i);
  }

  // stitch together two generated polygons
  if (points.length === 2 && !Object.is(points[0], points[1])) {
    // half of polygon
    _P.push(points[0]);
    i = bounds[0];
    while (i != bounds[1]) {
      _P.push(P[i]);
      i = (i + 1) % n;
    }
    _P.push(points[1]);

    // other half of polygon
    P_.push(points[1]);
    i = bounds[1];
    while (i != bounds[0]) {
      P_.push(P[i]);
      i = (i + 1) % n;
    }
    P_.push(points[0]);

    polygons.push(_P, P_);
    // transfer parent information
    polygons.forEach(function(d) {
      d.parent = P.parent;
      d.transform = P.transform;
    });
  }
  
  return polygons;
};