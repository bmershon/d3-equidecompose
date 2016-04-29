import {default as rotation} from "./rotation";
import {default as identity} from "./identity";
import {default as translation} from "./translation";
import {default as angle} from "./angle";
import {default as add} from "./add";
import {default as sub} from "./sub";
import {default as scale} from "./scale";
import {default as multiply} from "./multiplyMatVec";
import {default as Multiply} from "./multiplyMatMat";
import {polygonCentroid} from "d3-polygon";

function Polygon(P) {
  this.transforms = [];
  this._matrix = identity(3);
  this._origin = 
  this._target = null;
}

Polygon.prototype = Object.create(Array.prototype); // subclass Array
Polygon.prototype.constructor = Polygon;
Polygon.prototype.translate = translate;
Polygon.prototype.rotate = rotate;
Polygon.prototype.accumulate = accumulate;
Polygon.prototype.origin = origin;
Polygon.prototype.centroid = centroid;
Polygon.prototype.rotation = theta;
Polygon.prototype.clone = clone;

function translate(T) {
  for (let i = 0, n = this.length; i < n; i++) {
    let v = this[i];
    this[i] = [v[0] + T[0], v[1] + T[1]];
  }

  return this;
}

function rotate(theta, pivot) {
  var R = rotation(theta);

  if (pivot) {
    this.translate([-pivot[0], -pivot[1]]);
  }

  for (let i = 0, n = this.length; i < n; i++) {
    this[i] = multiply(R, this[i]);
  }

  if (pivot) {
    this.translate(pivot);
  }

  return this;
}

// Returns a polygon translated into the shape it came from.
function origin() {
  if (this._origin) return this._origin;

  this._origin = this.accumulate();

  return this._origin;
}

function accumulate() {
  let P = this.clone(), // do not change THIS polygon's geometry
      n = this.transforms.length,
      M = identity(3);

  for (let i = n - 1; i >= 0; i--) {
    let transform = this.transforms[i];

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

// This polygon's rigid rotation about centroid relative to original placement.
function theta() {
  var a, b;

  a = this[0];

  b = multiply(this.origin().matrix(), a);
  b = multiply(translation(sub(this.centroid(), this.origin().centroid())), b);

  return 180 / Math.PI * angle(this.centroid(), a, b.slice(0, 2));
}

function centroid() {
  return polygonCentroid(this);
}

function clone() {
  return polygon(JSON.parse(JSON.stringify(this.slice())));
}

// Create new polygon from array of position tuples.
export default function polygon(positions) {
  var P = new Polygon();
  P.push.apply(P, positions);
  return P;
}