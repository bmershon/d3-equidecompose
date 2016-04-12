import {default as sub} from "./sub";
import {default as length} from "./length";
import {default as normalize} from "./normalize";
import {default as scale} from "./scale";
import {default as add} from "./add";
import {polygonArea} from "d3-polygon";

export default function(collection) {
  var dist = [],
      A, B, C, D,
      l, w, area = 0.0, s,
      rectangle = collection.rectangle,
      square,
      polygons = [];

  A = rectangle[0];

  for(let i = 1; i < rectangle.length; i++){
  	dist.push({point: rectangle[i], distance:length(sub(a,rectangle[i]))});
  }

  dist = dist.sort(function(a,b){
  	return b.distance - a.distance;
  });

  l = dist[1];
  w = dist[2];
  area = l.distance * w.distance;
  //area = Math.abs(polygonArea(rectangle));
  s = Math.sqrt(area);
  B = add(a,scale(s, normalize(sub(l.point, A))));
  C = add(a,scale(s, normalize(sub(w.point, A))));
  D = add(add(a,sub(B, A)), sub(C, A));
  
  square = [A, B, D, C];
  polygons.square = square;

  return polygons;
};