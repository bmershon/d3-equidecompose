import scale from "../vector/scale";

// Returns the undo operation for a translation or rotation about a pivot.
export default function(transform){
  var undone;
  
  if (transform.rotate && transform.pivot) {
    undone = {rotate: -transform.rotate, pivot: transform.pivot};
  } else if (transform.translate) {
    undone = {translate: scale(-1, transform.translate)};
  }

  return undone;
}