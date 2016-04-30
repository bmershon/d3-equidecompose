/*
Computes the dot product between 2 vectors.
*/

export default function(a, b) {
  if(a.length != b.length){
    throw new Error("Invalid dimensions for dot product.");
    return null;
  }
  var res = 0.0;
  for(let i = 0; i < a.length; i++){
    res += a[i]*b[i]; 
  }
  return res;
}