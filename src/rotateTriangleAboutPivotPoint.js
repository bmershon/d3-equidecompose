import {default as rotationMatrix} from "./rotationMatrix";
import {default as multiplyMatVec} from "./multiplyMatVec";
import {default as sub} from "./sub";
import {default as add} from "./add";
import {default as pointInPolygon} from "./pointInPolygon";

export default function(triangle,pivotIndex,theta,num,rectangle) {
  if(triangle.length!=3){
  	console.log("Not a triangle");
  	return null;
  }
  var rotate = function(triangle,pivotIndex,theta,num){
    var a = triangle[pivotIndex];
    var b = triangle[(pivotIndex + 1) % 3];
    var c = triangle[(pivotIndex + 2) % 3];

    // We will be rotaing B to b and C to c
    var rot = rotationMatrix(theta/num);
    var animation = [];
    for(let i = 0; i < num; i++){
      b = add(a,multiplyMatVec(rot,sub(b,a)));
      c = add(a,multiplyMatVec(rot,sub(c,a)));
      animation.push([a,b,c]);
    }
    return animation;
  }
  var animation = rotate(triangle,pivotIndex,theta,num);
  if(num < 5){
    return animation;
  }
  for(let i = 2; i < animation.length-2; i++){
    var b = animation[i][1];
    var c = animation[i][2];
    if(pointInPolygon(b,rectangle) || pointInPolygon(c,rectangle)){
      return rotate(triangle,pivotIndex,-1.0*theta,num);
    }
  }
  return animation;
}