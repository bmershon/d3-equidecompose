import {default as rotation} from "./rotation";
import {default as identity} from "./identity";
import {default as translation} from "./translation";
import {default as angle} from "./angle";
import {default as add} from "./add";
import {default as sub} from "./sub";
import {default as scale} from "./scale";
import {default as length} from "./length";
import {default as cross} from "./cross";
import degree from "./degree";
import polygon from "./polygon";

// Takes in list of polygon collections, each arranged in a rectangle
// of equal width. Returns a list of polygon collections that have been arranged
// to fit in a square. Returned list has property `square` which denotes the bounding
// vertices for the stacked collections.
export default function stack(boxes) {
  var previous, current,
      A, B, C, D,
      pivot, snap, aligner,
      stacked = [],
      i, n,
      T, direction, theta;

  if (boxes.length < 2) return boxes;

  previous = boxes[0];

  for (i = 1, n = boxes.length; i < n; i++) {
    pivot = previous.rectangle[3];
    current = boxes[i];

    snap = (isWide(current.rectangle))
              ? current.rectangle[0]
              : current.rectangle[1];
    
    T = sub(pivot, snap);
    current.rectangle = polygon(current.rectangle).translate(T);

    aligner = (isWide(current.rectangle))
              ? current.rectangle[1]
              : current.rectangle[2];

    direction = cross(pivot, previous.rectangle[2], aligner)[2] > 0 ? 1 : -1;
    theta = -1 * direction * degree(angle(pivot, previous.rectangle[2], aligner));

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

  return stacked;
}

// Assumes BCDA orientation, where a rectangle is wide if 
// side BC is longer than BA.
function isWide(rectangle) {
  var A = rectangle[3],
      B = rectangle[0],
      C = rectangle[1];
      
  return length(sub(B, C)) > length(sub(B, A));
}

