import {default as pairwise} from "./pairwise";

/*
Given 2 array inputs a and b, this function adds a[i] + b[i]
*/

export default function(a, b) {
  return pairwise(a, b, function(x, y){
    return x + y;
  });
}