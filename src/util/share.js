import { WIN } from "./constants";
//array of guess objects (name, distance) => string
//gameID
//status of the game (1 =win, 2=loss)

export const createShareText = (gameID, guesses, status) => {
  let outputString = "Collegedle " + gameID + " ";
  outputString += (status === WIN ? guesses.length : "X") + "/6\n";
  return outputString;
};
