import {default as rotation} from "./rotation";
import {default as angle} from "./angle";
import {default as add} from "./add";
import {default as sub} from "./sub";
import {default as scale} from "./scale";
import {default as multiply} from "./multiplyMatVec";
import {default as triangleArea} from "./triangleArea";
import {polygonCentroid} from "d3-polygon";

function Polygon(P) {
  this.transforms = [];
  this._origin = 
  this._target = null;
}

Polygon.prototype = Object.create(Array.prototype); // subclass Array
Polygon.prototype.constructor = Polygon;
Polygon.prototype.translate = translate;
Polygon.prototype.rotate = rotate;
Polygon.prototype.accumulate = accumulate;
Polygon.prototype.origin = origin;
Polygon.prototype.target = target;
Polygon.prototype.centroid = centroid;
Polygon.prototype.clone = clone;
Polygon.prototype.containsPoint = containsPoint;

function containsPoint(point){
  var myArea = 0.0;
  var pointArea = 0.0;
  var a = point;
  for(let i = 1; i < this.length; i++){
    var b = this[i];
    var c = this[(i+1 == this.length) ? 0 : i+1];
    myArea += triangleArea(a,b,c);
  }
  a = this[0];
  for(let i = 1; i < this.length-1; i++){
    var b = this[i];
    var c = this[i+1];
    pointArea += triangleArea(a,b,c);
  }
  return Math.abs(myArea - pointArea) < 1e-8;
}

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

// cache accumulated transforms
function origin() {
  if (this._origin) return this._origin;

  this._origin = this.accumulate();

  return this._origin;
}

function target() {
  if (this._target) return this._target;
  // TODO
  this._target = this;
}

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

  return polygon(P.slice()).clone(); // return positions of only
}

function centroid() {
  return polygonCentroid(this);
}

function clone() {
  return polygon(JSON.parse(JSON.stringify(this.slice())));
}

// create new polygon from array of position tuples
export default function polygon(positions) {
  var P = new Polygon();
  P.push.apply(P, positions);
  return P;
}