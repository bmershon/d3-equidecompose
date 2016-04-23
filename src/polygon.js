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

Polygon.prototype = clone(Array.prototype); // subclass Array
Polygon.prototype.translate = translate;
Polygon.prototype.rotate = rotate;
Polygon.prototype.accumulate = accumulate;

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
    this[i] = multiply(R, this[i]);
  }

  if (pivot) {
    this.translate(pivot);
  }

  return this;
}

function accumulate() {
  let P = polygon(this),
      n = this.transforms.length;

  for (let i = n - 1; i >= 0; i--) {
    let transform = this.transforms[i];
    if (transform.rotate) {
      P.rotate(transform.rotate, transform.pivot);
    } else { // translate
      P.translate(transform.translate);
    }
  }

  return P.slice(); // clone of polygon with transforms applied
}


// create new polygon from array of position tuples
export default function polygon(positions) {
  var P = new Polygon();
  P.push.apply(P, positions);
  return P;
}