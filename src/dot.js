/*
  Computes the dot product between 2 vectors.
*/
export default function(a, b) {
  var res = 0.0, i;

  if (a.length != b.length){
    throw new Error("Invalid dimensions for dot product.");
  }

  for (i = 0; i < a.length; i++) {
    res += a[i] * b[i]; 
  }

  return res;
}