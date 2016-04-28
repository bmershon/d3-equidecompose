import {default as rotation} from "./rotation";
import {default as angle} from "./angle";
import {default as sub} from "./sub";
import {default as add} from "./add";
import {default as multiply} from "./multiplyMatVec";
import {polygonCentroid} from "d3-polygon";

function Polygon(P) {
  this.transforms = []; // public member
  this._origin = 
  this._target = null;
}

Polygon.prototype = Object.create(Array.prototype); // subclass Array
Polygon.prototype.constructor = Polygon;
Polygon.prototype.translate = translate; // modify in place
Polygon.prototype.rotate = rotate; // modify in place
// Polygon.prototype.origin = origin; // return array of positions
// Polygon.prototype.target = target; // return array of positions
Polygon.prototype.accumulate = accumulate; // return array of positions
Polygon.prototype.centroid = centroid;
Polygon.prototype.theta = theta; // rotation experienced from origin to current state

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

// function origin() {
//   if (this._origin) return this._origin;

//   this._origin = this.accumulate()
// }

function accumulate() {
  let P = polygon(this), // do not change THIS polygon's geometry
      n = this.transforms.length;

  for (let i = n - 1; i >= 0; i--) {
    let transform = this.transforms[i];

    if (transform.rotate && transform.pivot) { // pivot required
      P.rotate(transform.rotate, transform.pivot);
    } else if (transform.translate) {
      P.translate(transform.translate);
    }
  }

  return polygon(P.slice()); // return positions of only
}

function centroid() {
  return polygonCentroid(this);
}

// angle about centroid relative to original placement
function theta() {
  var P, Q, a, b;

  P = polygon(this.slice());
  Q = P.accumulate();

  a = P[0];
  b = add(sub(P.centroid(), Q.centroid()), Q[0]);

  return 180 / Math.PI * angle(a, P.centroid(), b);
}

// create new polygon from array of position tuples
export default function polygon(positions) {
  var P = new Polygon();
  P.push.apply(P, positions);
  return P;
}