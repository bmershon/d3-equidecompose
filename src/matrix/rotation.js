export default function(theta) {
  var rad = theta * Math.PI / 180.0;
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  return [[c, -1.0 * s, 0],
          [s,        c, 0],
          [0,        0, 1]];
}