// keep polygon properties, update vertices
export default function polygonTranslate(polygon, T) {
  for (let i = 0; i < polygon.length; i++) {
    let v = polygon[i];
    polygon[i] = [v[0] + T[0], v[1] + T[1]];
  }
}