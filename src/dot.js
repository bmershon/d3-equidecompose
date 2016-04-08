export default function(a, b) {
	if(a.length!=b.length){
		console.log("Invalid dimensions for dot product.");
		return null;
	}
	var res = 0.0;
	for(let i = 0; i < a.length; i++){
		res += a[i]*b[i]; 
	}
	return res;
  //return u[0] * v[0] + u[1] * v[1];
}