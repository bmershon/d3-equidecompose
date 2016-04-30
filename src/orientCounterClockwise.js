import polygon from "./polygon";

// got from here: http://gamedev.stackexchange.com/questions/13229/sorting-array-of-points-in-clockwise-order
// orients points in counter clockwise direction

export default function(points){
	var poly = polygon(points);
	var c = poly.centroid();
	points.sort(function(a,b){
		return  Math.atan2(b[1] - c[1],b[0] - c[0]) - Math.atan2(a[1] - c[1],a[0] - c[0]);
	})
	return points;
}