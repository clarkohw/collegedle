import { render } from "@testing-library/react";
import "./GuessList.css";

function GuessList(props) {
  const getHint = (guess, index) => {
    const selectEmoji = (difference) => (difference > 0 ? " ^ " : " v ");
    if (index === 0) {
      const difference = props.collegedle["studentBody"] - guess["studentBody"];
      return (
        "Student population is " +
        selectEmoji(difference) +
        "by " +
        Math.abs(difference) +
        " students"
      );
    } else if (index === 1) {
      const difference = props.collegedle["endowment"] - guess["endowment"];
      return (
        "Endowment is " +
        selectEmoji(difference) +
        "by " +
        Math.abs(difference) +
        " million dollars"
      );
    } else if (index === 2) {
      //acceptance rate
      const difference =
        props.collegedle["acceptanceRate"] - guess["acceptanceRate"];
      return (
        "Acceptance rate is " +
        selectEmoji(difference) +
        "by " +
        Math.abs(difference) +
        " percent"
      );
    } else if (index === 3) {
      return (
        "The school is in the " +
        props.collegedle["athleticConference"] +
        " athletic conference"
      );
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
      {props.guesses.map((guess, index) => (
        <div>
          <div className="college-name">{guess["name"]}</div>
          <div>Hint: {getHint(guess, index)} </div>
        </div>
      ))}
      {renderGuessBlocks()}
    </div>
  );
}

export default GuessList;
