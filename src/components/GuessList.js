import { Typography } from "@mui/material";
import { generateTheme } from "../util/createTheme";
import "./GuessList.css";

function GuessList(props) {
  const guessComponent = (guess, index) => {
    if (guess["name"] === props.collegedle["name"]) {
      return (
        <div className="correct-guess">
          <Typography variant="body1">
            <b>{guess["name"]}</b>
          </Typography>
        </div>
      );
    } else {
      return (
        <div className="guess-hint">
          <div className="guess">
            <Typography variant="body1">
              <b>{guess["name"]}</b>
            </Typography>
          </div>
          <Typography variant="body1" className="hint">
            {getHint(guess, index)}
          </Typography>
        </div>
      );
    }
  };
  const getHint = (guess, index) => {
    const selectEmoji = (difference) => (difference > 0 ? " ⬆️ " : " ⬇️ ");
    if (index === 0) {
      const difference =
        Math.round(
          (props.collegedle["studentBody"] - guess["studentBody"]) / 100
        ) * 100;
      return (
        "Hint: Student population is " +
        selectEmoji(difference) +
        "by " +
        Math.abs(difference) +
        " students"
      );
    } else if (index === 1) {
      return (
        "Hint: located in a " + props.collegedle["locale"] + " environment"
      );
    } else if (index === 2) {
      //acceptance rate
      const difference =
        props.collegedle["admissionRate"] - guess["admissionRate"];
      return (
        "Hint: Acceptance rate is " +
        selectEmoji(difference) +
        "by " +
        Math.abs(difference) +
        "%"
      );
    } else if (index === 3) {
      return (
        "Hint: Atheltic conference is " + props.collegedle["athleticConference"]
      );
    } else if (index === 4) {
      return "Hint: Mascot is " + props.collegedle["mascot"];
    }
  };

  const renderGuessBlocks = () => {
    const blocks = [];
    const padding = generateTheme().typography.body1.fontSize;
    for (let i = 0; i < 6 - props.guesses.length; i++) {
      blocks.push(
        <div
          key={i}
          style={{ paddingTop: padding }}
          className="empty-guess"
        ></div>
      );
    }
    return blocks;
  };

  return (
    <div className="guess-list">
      {props.guesses.map((guess, index) => guessComponent(guess, index))}
      {renderGuessBlocks()}
    </div>
  );
}

export default GuessList;
