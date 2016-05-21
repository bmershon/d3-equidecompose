import polygon from "./polygon";
import {default as infiniteIntersection} from "./infiniteIntersection";
import {default as right} from "./right"
import {default as undo} from "./undo";

// Sutherland-Hodgeman algorithm for convex subject and clip polygons.
export default function(subject, clip){
  var inputList, outputList,
      clipped,
      i, j, n,
      end, edge, 
      E, S, // two subject vertices
      eInside, sInside,
      intersection,
      undone, transforms;

  clip = clip.clone().reverse();
  outputList = subject.slice(0);

  for (i = 0, n = clip.length; i < n; i++) {    
    end = (i + 1) % n;
    edge = [clip[i], clip[end]];
    inputList = outputList.slice(0);
    outputList = [];

    S = inputList[inputList.length - 1]; 

    for (j = 0; j < inputList.length; j++) {      
      E = inputList[j];
      eInside = !right(E, edge);
      sInside = !right(S, edge);

      if (eInside){
        if (!sInside){
          intersection = infiniteIntersection(E, S, clip[i], clip[end]);
          if (intersection){
            outputList.push(intersection);
          }
        }
        outputList.push(E);
      } else if (sInside) {
        intersection = infiniteIntersection(E, S, clip[i], clip[end]);
        if (intersection){
          outputList.push(intersection);
        }
      }
      S = E;
    }
  }

  clipped = polygon(outputList);
  
  // subject polygon's original transform history
  transforms = subject.transforms.slice(0);
    
  // append reversed (and undone) transfer history of clip polygon
  clipped.target = clip.transforms.slice(0);
  undone = clip.transforms.slice(0).reverse(0).map(undo);
  transforms = transforms.concat(undone);
  clipped.transforms = transforms;

  return clipped;
}