import { Typography } from "@mui/material";
import { generateTheme } from "../util/createTheme";
import "./GuessList.css";
import { addRem } from "../util/addrem";
import { Grid } from "@mui/material";
import { getDistance } from "../util/distance";
import { maxDistance, MAX_GUESSES } from "../util/constants";

function GuessList(props) {
  const getGuessDistance = (guess, collegedle, maxDistance) => {
    return Math.round(
      getDistance(
        guess.latitude,
        guess.longitude,
        collegedle.latitude,
        collegedle.longitude
      )
    );
  };
  const guessComponent = (guess, index) => {
    if (guess["name"] === props.collegedle["name"]) {
      return (
        <Grid
          justifyContent="space-between"
          className="correct-guess"
          wrap="nowrap"
          container
          direction="row"
        >
          <Grid item>
            <Typography variant="body1">
              <b>{guess["name"]}</b>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">
              <b>0 mi</b>
            </Typography>
          </Grid>
        </Grid>
      );
    } else {
      return (
        <div className="guess-hint">
          <Grid
            justifyContent="space-between"
            className="guess"
            wrap="nowrap"
            container
            direction="row"
          >
            <Grid item>
              <Typography variant="body1">
                <b>{guess["name"]}</b>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">
                <b>
                  {getGuessDistance(guess, props.collegedle, maxDistance)} mi
                </b>
              </Typography>
            </Grid>
          </Grid>
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
          (props.collegedle["studentBody"] - guess["studentBody"]) / 10
        ) * 10;
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
        Math.round(
          (props.collegedle["admissionRate"] - guess["admissionRate"]) * 10
        ) / 10;
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
    let bodyPadding = generateTheme().typography.body1.fontSize;
    for (let i = 0; i < MAX_GUESSES - props.guesses.length; i++) {
      blocks.push(
        <div
          key={i}
          style={{
            marginBottom: addRem(bodyPadding, 0.7),
            paddingTop: addRem(bodyPadding, 1.25),
          }}
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
