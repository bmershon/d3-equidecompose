export default function(a, row) {
  var res = [], i;
  for (i = 0; i < a[0].length; i++){
    res[i] = a[row][i];
  }
  return res;
}