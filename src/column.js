/*
Returns column col from matrix a.
*/

export default function(a, col) {
  var res = [];
  for(let i = 0; i < a.length; i++){
    res[i] = a[i][col];
  }
  return res;
}