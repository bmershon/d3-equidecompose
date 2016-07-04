
// Takes in list of polygon collections, each arranged in a rectangle
// of equal width. Returns a list of polygon collections that have been arranged
// to fit in a square. Returned list has property `square` which denotes the bounding
// vertices for the stacked collections.
export default function stack(boxes) {
  var first;

  if (boxes.length < 2) return boxes;

  first = boxes[0].rectangle;

  return boxes;
}