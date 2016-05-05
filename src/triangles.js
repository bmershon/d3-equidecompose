import triangle2Triangle from "./triangle2Triangle";

export default function(A, B) {
  var polygons = triangle2Triangle(A, B),
      decomposition;

  return decomposition = {

    sources: function() {
      return polygons.map(function(d) {
        return d.origin().slice(0);
      });
    },

    subjects: function() {
      return polygons.map(function(d) {
        return d.slice(0);
      });
    }
  }
}