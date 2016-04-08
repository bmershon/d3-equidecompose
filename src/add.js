import {default as arithmeticoperation} from "./arithmeticoperation";

export default function(a, b) {
  return arithmeticoperation(a,b,function(x,y){
    return x+y;
  });
  //return [a[0] + b[0], a[1] + b[1]];
}