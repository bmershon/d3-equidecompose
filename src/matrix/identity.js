export default function(n) {
  var i, j,
      eye = [[0, 0, 0],
             [0, 0, 0],
             [0, 0, 0]];

  for (i = 0; i < n; i++){
    for (j = 0; j < n; j++){
      eye[i][j] = 0.0;
    }
  }

  for (i = 0; i < n; i++){
    eye[i][i] = 1.0;
  }

  return eye;
}