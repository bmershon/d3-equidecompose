import {default as rotation} from "./rotation";
import {default as identity} from "./identity";
import {default as translation} from "./translation";
import {default as angle} from "./angle";
import {default as add} from "./add";
import {default as sub} from "./sub";
import {default as scale} from "./scale";
import {default as multiply} from "./multiplyMatVec";
import {default as Multiply} from "./multiplyMatMat";
import {polygonCentroid, polygonContains} from "d3-polygon";

// Polygon constructor
function Polygon(P) {
  this.transforms = [];
  this._matrix = identity(3);
  this._origin = null;
}

Polygon.prototype = Object.create(Array.prototype); // subclass Array
Polygon.prototype.constructor = Polygon;
Polygon.prototype.centroid = centroid;
Polygon.prototype.containsPoint = containsPoint;
Polygon.prototype.translate = translate;
Polygon.prototype.rotate = rotate;
Polygon.prototype.accumulate = accumulate;
Polygon.prototype.origin = origin;
Polygon.prototype.clone = clone;

function centroid() {
  return polygonCentroid(this);
}

function containsPoint(point){
  return polygonContains(this, point);
}

function translate(T) {
  var i, v, n;
  for (i = 0, n = this.length; i < n; i++) {
    v = this[i];
    this[i] = [v[0] + T[0], v[1] + T[1]];
  }

  return this;
}

function rotate(theta, pivot) {
  var R = rotation(theta), i, n;

  if (pivot) {
    this.translate([-pivot[0], -pivot[1]]);
  }

  for (i = 0, n = this.length; i < n; i++) {
    this[i] = multiply(R, this[i]);
  }

  if (pivot) {
    this.translate(pivot);
  }

  return this;
}

// Returns a clone of this polygon with transform history applied.
function origin() {
  if (this._origin) return this._origin;
  this._origin = this.accumulate();
  return this._origin;
}

// Apply transform history to a clone of polygon.
function accumulate() {
  var P = this.clone(),
      n = this.transforms.length,
      M = identity(3),
      i, transform;

  // Most recent transforms are pushed to end of array.
  for (i = n - 1; i >= 0; i--) {
    transform = this.transforms[i];

    if (transform.rotate && transform.pivot) { // pivot required
      P.rotate(transform.rotate, transform.pivot);
      M = Multiply(translation(scale(-1, transform.pivot)), M);
      M = Multiply(rotation(transform.rotate), M);
      M = Multiply(translation(transform.pivot), M);
    } else if (transform.translate) {
      P.translate(transform.translate);
      M = Multiply(translation(transform.translate), M);
    }
  }
  
  P._matrix = M;
  return P;
}

// Produces deep copy of vertex positions, shallow copy of other attributes
function clone() {
  var positions = JSON.parse(JSON.stringify(this.slice(0)));
  return Object.assign(polygon(positions), this);
}

// Create new Polygon from array of position tuples.
export default function polygon(positions) {
  var P = new Polygon();
  P.push.apply(P, positions);
  return P;
}