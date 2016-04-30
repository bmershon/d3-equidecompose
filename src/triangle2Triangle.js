import {default as triangle2Rectangle} from "./triangle2Rectangle";
import {default as rectangle2Square} from "./rectangle2Square";
import {default as clipCollection} from "./clipCollection";
import polygon from "./polygon";

/*
  Takes in a source and and a subject triangle;
*/
export default function(source, subject) {
  var A, B, squareA, squareB, clipped;

  // TODO rescale subject triangle about centroid in the case that
  // its area is not equal to that of the source triangle

  A = rectangle2Square(triangle2Rectangle(source));
  B = rectangle2Square(triangle2Rectangle(subject));
  squareA = polygon(A.square);
  squareB = polygon(B.square);

  clipped = clipCollection(A, B);
  
  return clipped;
};