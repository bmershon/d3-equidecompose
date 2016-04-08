export default function(a,b,operation){
  var res = [];
  for(let i = 0; i < a.length; i++){
    res[i] = operation(a[i],b[i]);
  }
  return res;
}