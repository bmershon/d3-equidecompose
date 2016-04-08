export default function(a, row) {
  var res = [];
  for(let i = 0; i < a[0].length; i++){
    res[i] = a[row][i];
  }
  return res;
}