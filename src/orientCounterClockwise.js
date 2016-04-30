import polygon from "./polygon";

export default function(points){
	var poly = polygon(points);
	var c = poly.centroid();
	/*var a = [];
	for(let i = 0; i < points.length; i++){
		var p = points[i];
		a.push(Math.atan2(p[1] - c[1],p[0] - c[0]));
	}*/
	points.sort(function(a,b){
		return  Math.atan2(b[1] - c[1],b[0] - c[0]) - Math.atan2(a[1] - c[1],a[0] - c[0]);
	})
	return points;
}