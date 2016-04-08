import {default as sub} from "./sub";
import {default as length} from "./length";

export default function (a, b, c) {
    var A = length(sub(a,b));
    var B = length(sub(a,c));
    var C = length(sub(b,c));
    var s = (A+B+C)/2.0;
    return Math.sqrt(s*(s-A)*(s-B)*(s-C));
}