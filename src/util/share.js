import { ALERT_TIME_MS, WIN } from "./constants";
//array of guess objects (name, distance) => string
//gameID
//status of the game (1 =win, 2=loss)
export const shareText = (gameID, guesses, status, setShareModalOpen) => {
  const textToShare = createShareText(gameID, guesses, status);
  const shareData = { text: textToShare };
  if (navigator.canShare && navigator.canShare(shareData)) {
    navigator.share(shareData);
  } else {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToShare).then(() => {
        setShareModalOpen(true);
        setTimeout(() => setShareModalOpen(false), ALERT_TIME_MS);
      });
    }
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
