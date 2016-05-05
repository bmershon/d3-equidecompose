import {default as pairwise} from "./pairwise";

export default function(a, b) {
  return pairwise(a, b, function(x, y){
    return x - y;
  });
}