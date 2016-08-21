import normalize from "./normalize";

// Returns a vector pointing along the z-axis with length ||AB x AC||.
export default function cross(a, b, c) {
  var u, v, z, res;

  u = normalize([b[0] - a[0], b[1] - a[1]]),
  v = normalize([c[0] - a[0], c[1] - a[1]]),
  z = u[0] * v[1] - u[1] * v[0],
  res = [0, 0, 0];
  res[0] = res[1] = 0;
  res[2] = z;

  return res;
}