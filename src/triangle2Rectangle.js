import {default as angle} from "./angle";

export default function(T) {
  let index = 0,
      maxAngle = -Infinity;
  
  // ensure we start with obtuse angle, if there is one
  for (let i = 0; i < 3; i++) {
    let theta = 0;
    theta = angle(T[i % 3], T[(i + 1) % 3], T[(i + 2) % 3]);
    if (theta > maxAngle) {
      maxAngle = theta;
      index = i;
    }
  }

  // TODO
  return null;
};
