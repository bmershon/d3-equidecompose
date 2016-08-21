import angle from "../vector/angle";
import cross from "../vector/cross";
import degree from "../matrix/degree";
import scale from "../vector/scale";
import sub from "../vector/sub";
import polygon from "../polygon/polygon";

// Takes in a list of polygon collections, each arranged in a rectangle
// of equal width and returns a list of polygon collections that have been
// arranged to fit in a square.
// The returned list of collections has property `square` which
// denotes the bounding vertices for the stacked collections.
export default function stack(boxes) {
  var previous, current,
      A, B, C, D,
      pivot, snap,
      stacked = [],
      i, n,
      T, direction, theta;

  if (boxes.length < 2) {
    stacked = boxes.slice();
    stacked.square = stacked[0].rectangle;
    return stacked;
  }

  previous = boxes[0];
  stacked.push(previous);

  for (i = 1, n = boxes.length; i < n; i++) {
    pivot = previous.rectangle[3];

    current = boxes[i];

    snap = current.rectangle[0];
    
    T = sub(pivot, snap);
    current.rectangle = polygon(current.rectangle).translate(T);

    direction = cross(pivot, previous.rectangle[2], current.rectangle[1])[2] > 0
        ? -1
        : 1;
        
    theta = degree(angle(pivot, previous.rectangle[2], current.rectangle[1]));
    theta *= direction;

    // Translate collection of polygons forming a rectangle of a given width.
    // Align a vertex and pivot rectangle to fit flush with previous collection.
    current.forEach(function(d) {
      d.translate(T);
      d.transforms.push({
        translate: scale(-1, T)
      });
      d.rotate(theta, pivot);
      d.transforms.push({
        rotate: -theta,
        pivot: pivot,
      });
    });

    current.rectangle.rotate(theta, pivot);
  
    stacked.push(current);
    previous = current;
  }

  A = stacked[n - 1].rectangle[3];
  B = stacked[0].rectangle[0];
  C = stacked[0].rectangle[1];
  D = stacked[n - 1].rectangle[2];

  stacked.square = [B, C, D, A];

  return stacked;
}
