import {default as rotation} from "./rotation";
import {default as multiply} from "./multiplyMatVec";

function clone(obj) {
  function F() { }
  F.prototype = obj;
  return new F();
}

function Polygon(P) {
  this.transforms = []; // public member
}

// subclass Array, add methods
Polygon.prototype = clone(Array.prototype);

Polygon.prototype.translate = translate;
Polygon.prototype.rotate = rotate;

function translate(T) {
  for (let i = 0, n = this.length; i < n; i++) {
    let v = this[i];
    this[i] = [v[0] + T[0], v[1] + T[1]];
  }

  return this;
}

// optional pivot point
function rotate(theta, pivot) {
  var R = rotation(theta);

  if (pivot) {
    this.translate([-pivot[0], -pivot[1]]);
  }

  for (let i = 0, n = this.length; i < n; i++) {
    let v = this[i];
    v = multiply(R, v);
  }

  if (pivot) {
    this.translate(pivot);
  }

  return this;
}


// create new polygon from array of position tuples
export default function polygon(positions) {
  var P = new Polygon();
  P.push.apply(P, positions);
  return P;
}