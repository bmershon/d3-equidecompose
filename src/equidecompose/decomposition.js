import angle from "../vector/angle";
import clipCollection from "../polygon/clipCollection";
import cross from "../vector/cross";
import degree from "../matrix/degree";
import length from "../vector/length";
import polygon from "../polygon/polygon";
import { polygonArea } from "d3-polygon";
import rectangle2Rectangle from "./rectangle2Rectangle";
import scale from "../vector/scale";
import stack from "../equidecompose/stack";
import sub from "../vector/sub";
import { sum } from "d3-array";
import triangle2Rectangle from "./triangle2Rectangle";

// Takes in source and subject meshes, returns a decomposition layout.
function decompose(source, subject) {
  var A, B,
      sourceStack, subjectStack,
      squareA, squareB,
      centroid, target, T,
      clipped, theta, direction,
      i = 0, j = 0, distance, min = Infinity,
      factor, area, width;

  source = source.map(function(d) { return polygon(d); });
  subject = subject.map(function(d) { return polygon(d); });

  area = collectionArea(source);
  width = Math.sqrt(area);
  factor = Math.sqrt(area / collectionArea(subject) );

  scaleCollection(factor, subject);

  sourceStack = stack(source.map(function(d) {return stackable(width, d); }));
  subjectStack = stack(subject.map(function(d) {return stackable(width, d); }));

  A = flatten(sourceStack);
  B = flatten(subjectStack);

  A.square = sourceStack.square;
  B.square = subjectStack.square;

  squareA = polygon(A.square);
  squareB = polygon(B.square);
  centroid = squareA.centroid();
  target = squareB.centroid();
  T = [(centroid[0] - target[0]), (centroid[1] - target[1])];
  squareB = squareB.clone().translate(T);

  // find nearest vertex coorespondence in Q for first vertex in P
  for (i = 0, j = 0; i < 4; i++) {
    distance = length(sub(squareA[0], squareB[i]));
    if (distance < min) {
      min = distance;
      j = i;
    }
  }

  // rotate through a minimal angle, in the correct direction
  direction = cross(centroid, squareB[j], squareA[0])[2] > 0 ? 1 : -1;
  theta = direction * degree(angle(centroid, squareB[j], squareA[0]));

  // center collection B on collection A 
  B.forEach(function(d) {
    d.translate(T);
    d.transforms.push({
      translate: scale(-1, T),
    });
    d.rotate(theta, centroid);
    d.transforms.push({
      rotate: -theta,
      pivot: centroid,
    });
  });

  clipped = clipCollection(A, B);

  clipped = clipped.map(function(d) {
    var p = d.clone();
    p.transforms = d.target;
    p = p.origin(); // place in subject triangle
    p.transforms = d.transforms; // restore joined transform history
    return p;
  });

  clipped.scale = factor;
  return clipped;
}

function stackable(width, triangle) {
  return rectangle2Rectangle(triangle2Rectangle(triangle), width);
}

function flatten(groups) {
  var flattened = [];
  groups.forEach(function(d) {
    [].push.apply(flattened, d);
  });
  return flattened;
}

function collectionCentroid(collection) {
  var centroids;

  centroids = collection.map(function(d) {
    return polygon(d).centroid();
  });

  if (centroids.length == 1) {
    return centroids[0];
  }

  if (centroids.length == 2) {
    return [(centroids[0][0] + centroids[1][0]) / 2,
            (centroids[0][1] + centroids[1][1]) / 2];
  }
  
  return polygon(centroids).centroid();
}

function collectionArea(collection) {
  return sum(collection, function(d) { return polygonArea(d); });
}

function scaleCollection(factor, collection) {
  var C = collectionCentroid(collection);
  collection.forEach(function(d) {
    d.translate(scale(-1, C));
    d.scale(factor);
    d.translate(C);
  });
  return collection;
}

export default function decomposition(source, subject) {
  var polygons = decompose(source, subject);

  return {
    source: function() {
      return polygons.map(function(d) {
        return d.origin().slice(0);
      });
    },
    subject: function() {
      return polygons.map(function(d) {
        return d.slice(0);
      });
    },
    scale: function() {
      return polygons.scale;
    }
  }
}