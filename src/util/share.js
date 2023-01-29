import { WIN } from "./constants";
//array of guess objects (name, distance) => string
//gameID
//status of the game (1 =win, 2=loss)
export const shareText = (gameID, guesses, status) => {
  const textToShare = createShareText(gameID, guesses, status);
  if (navigator.canShare) {
    navigator.share({ text: textToShare });
  } else {
    navigator.clipboard.writeText(textToShare);
    alert("Coppied to clipboard");
  }
};

export const createShareText = (gameID, guesses, status) => {
  let outputString = "Collegedle " + gameID + " ";
  outputString += (status === WIN ? guesses.length : "X") + "/6\n";
  return outputString;
};

export const getNextDate = () => {
  var today = Date.now();
  var tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow;
};
