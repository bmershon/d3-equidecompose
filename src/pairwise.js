/*
  Given 2 array inputs a and b, this function computes operation between a[i] and b[i]
*/
export default function(a, b, operation){
  var res = [];
  for(let i = 0; i < a.length; i++){
    res[i] = operation(a[i], b[i]);
  }
  return res;
}