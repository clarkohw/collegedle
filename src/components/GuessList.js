import { render } from "@testing-library/react";
import "./GuessList.css";

function GuessList(props) {
  const guessComponent = (guess, index) => {
    return (
      <div className="guess-hint">
        <div className="guess">
          <b>{guess["name"]}</b>
        </div>
        <div className="hint">{getHint(guess, index)}</div>
      </div>
    );
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
      const difference =
        Math.round((props.collegedle["endowment"] - guess["endowment"]) * 100) /
        100;
      return (
        "Hint: Endowment is " +
        selectEmoji(difference) +
        "by " +
        Math.abs(difference) +
        " billion dollars"
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
      return "Hint: the locale of the school is " + props.collegedle["locale"];
    }
  };

  const renderGuessBlocks = () => {
    const blocks = [];
    for (let i = 0; i < 5 - props.guesses.length; i++) {
      blocks.push(<div key={i} className="empty-guess"></div>);
    }
    return blocks;
  };

  return (
    <div className="guess-list">
      {props.guesses.map((guess, index) => guessComponent(guess, index))}
      {/* {props.guesses.map((guess, index) =>
        guess["name"] === props.collegedle["name"] ? (
          <div className="correct-guess">
            <b>{guess["name"]}</b>
          </div>
        ) : (
          <div>
            <div className="college-name">{guess["name"]}</div>
            <div> {getHint(guess, index)} </div>
          </div>
        )
      )} */}
      {renderGuessBlocks()}
    </div>
  );
}

export default GuessList;
