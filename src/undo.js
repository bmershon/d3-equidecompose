import polygon from "./polygon";
import scale from "./scale";
import rotation from "./rotation";
import translation from "./translation";

// Returns the undo operation for a translation or rotation about a pivot.
export default function(transform){
  var undone;
  
  if (transform.rotate && transform.pivot) { // pivot required
    undone = rotation(-transform.rotate, transform.pivot);
  } else if (transform.translate) {
    undone = translation(scale(-1, transform.translate));
  }

  return undone;
}