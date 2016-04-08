import {default as triangleArea} from "./triangleArea";

export default function(point,polygon) {
	// This was code from Group 1 Image sources assignment
	var actualArea = 0;
    var checkArea = 0;
    var a = polygon[0];
    for(var i = 1; i < polygon.length - 1; i++){
        var b = polygon[i];
        var c = polygon[i+1];
        actualArea += triangleArea(a,b,c);
    }
    for(var i = 0; i < polygon.length-1; i++){
        var b = polygon[i];
        var c = polygon[i+1];
        checkArea += triangleArea(point,b,c);
    }
    var b = polygon[polygon.length-1];
    var c = polygon[0];
    checkArea += triangleArea(point,b,c);
    return Math.abs(actualArea - checkArea) < 1e-8;
}