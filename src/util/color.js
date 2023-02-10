import { getDistance } from "./distance";
import { scaleSequentialSqrt } from "d3-scale";
import { interpolateYlOrRd } from "d3-scale-chromatic";
import { MAX_DISTANCE } from "./constants";

export const getColor = (guess, collegedle) => {
  const dist = getDistance(
    guess["latitude"],
    guess["longitude"],
    collegedle["latitude"],
    collegedle["longitude"]
  );
  const colorScale = scaleSequentialSqrt(interpolateYlOrRd).domain([
    MAX_DISTANCE,
    0,
  ]);
  if (dist === 0) {
    return "#390";
  }
  return colorScale(dist);
};
