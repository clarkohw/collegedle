import { ALERT_TIME_MS, WIN } from "./constants";
//array of guess objects (name, distance) => string
//gameID
//status of the game (1 =win, 2=loss)
export const shareText = (
  collegedle,
  gameID,
  guesses,
  status,
  setShareModalOpen,
  setCopyFailureOpen
) => {
  const textToShare = createShareText(collegedle, gameID, guesses, status);
  const shareData = { text: textToShare };
  if (navigator.canShare && navigator.canShare(shareData)) {
    navigator.share(shareData);
  } else {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(textToShare)
        .then(() => {
          setShareModalOpen(true);
          setTimeout(() => setShareModalOpen(false), ALERT_TIME_MS);
        })
        .catch(() => {
          setCopyFailureOpen(true);
          setTimeout(() => setCopyFailureOpen(false), ALERT_TIME_MS);
        });
    }
  }
};

export const createShareText = (collegedle, gameID, guesses, status) => {
  let outputString = "Collegedle " + gameID + " ";
  outputString += (status === WIN ? guesses.length : "X") + "/6\n";
  outputString += generateEmojiBlocks(collegedle, guesses);
  outputString += "\nhttps://collegedle.com/";
  return outputString;
};

export const generateEmojiBlocks = (collegedle, guesses) => {
  return guesses
    .map((guess) => mapDistanceToEmoji(collegedle, guess).repeat(5))
    .join("\n");
};

const mapDistanceToEmoji = (collegedle, guess) => {
  const distance = guess.distance;
  const emojiTiles = ["🟩", "🟥", "🟧", "🟨", "⬜"];
  if (guess.name === collegedle.name) {
    return emojiTiles[0];
  } else if (distance >= 0 && distance <= 50) {
    return emojiTiles[1];
  } else if (distance > 50 && distance <= 250) {
    return emojiTiles[2];
  } else if (distance > 250 && distance <= 750) {
    return emojiTiles[3];
  } else if (distance > 750) {
    return emojiTiles[4];
  }
};

export const getNextDate = () => {
  var today = Date.now();
  var tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow;
};
