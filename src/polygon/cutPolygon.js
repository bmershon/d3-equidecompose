import intersect from "./intersect";
import polygon from "./polygon";

// Returns array of polygons resulting from cutting
// convex polygon P by segment ab. If the polygon is 
// not cut, an empty array is returned.
export default function(a, b, P) {
  var n = P.length,
      _P = [],
      P_ = [],
      points = [],
      e, 
      f = P[n - 1],
      bounds = [],
      i = -1,
      polygons = [],
      x;

  // walk through polygon edges, attempting intersections
  // with exact vertices or line segments
  while (++i < n) {
    e = f;
    f = P[i];

    // compare floating-point positions by reference
    if      ((a === e || b === e) && !(points.length && Object.is(points[0], e))) 
      x = e;
    else if ((a === f || b === f) && !(points.length && !Object.is(points[0], f)))
      x = f;
    else
      x = intersect(a, b, e, f);

    if (!x) continue; // no intersection
    if (points.length == 2) break;

    points.push(x);
    bounds.push(i);
  }

  // stitch together two generated polygons
  if (points.length == 2 && !Object.is(points[0], points[1])) {
    // stitch half of polygon
    _P.push(points[0]);
    i = bounds[0];
    while (i != bounds[1]) {
      // check point is not an EXACT intersection
      if (!Object.is(points[0], P[i]) && ! Object.is(points[1], P[i]))
        _P.push(P[i]);
      i = (i + 1) % n;
    }
    _P.push(points[1]);

    // stitch other half of polygon
    P_.push(points[0]);
    P_.push(points[1]);
    i = bounds[1];
    while (i != bounds[0]) {
      // check point is not an EXACT intersection
      if (!Object.is(points[0], P[i]) && ! Object.is(points[1], P[i]))
        P_.push(P[i]);
      i = (i + 1) % n;
    }

    polygons.push(polygon(_P), polygon(P_));

    // transfer parent properties
    polygons.forEach(function(d) {
      [].push.apply(d.transforms, P.transforms);
    });
  }
  
  return polygons;
}