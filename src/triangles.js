import triangle2Triangle from "./triangle2Triangle";

export default function(A, B) {
  var polygons = triangle2Triangle(A, B),
      decomposition;

  return decomposition = {
    source: function() {
      return polygons[0].map(function(d) {
        return d.slice(0);
      });
    },
    subject: function() {
      return polygons[1].map(function(d) {
        return d.slice(0);
      });
    }
  }
}