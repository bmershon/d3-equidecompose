import polygon from "./polygon";

/* Got from here: http://gamedev.stackexchange.com/questions/13229/sorting-array-of-points-in-clockwise-order

Orients points in counter-clockwise order.
*/ 

export default function(points){
	var poly = polygon(points.slice(0));
	var c = poly.centroid();
	poly.sort(function(a,b){
		return  Math.atan2(b[1] - c[1],b[0] - c[0]) - Math.atan2(a[1] - c[1],a[0] - c[0]);
	})
	return poly;
}