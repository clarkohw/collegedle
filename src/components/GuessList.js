import { Typography } from "@mui/material";
import { generateTheme } from "../util/createTheme";
import "./GuessList.css";
import { addRem } from "../util/addrem";
import { Grid } from "@mui/material";
import { animated } from "react-spring";
import { MAX_GUESSES } from "../util/constants";

function GuessList(props) {
  const guessComponent = (guess, index) => {
    return (
      <div id={"guess-" + index} className="guess-hint">
        <Grid
          key={index}
          justifyContent="space-between"
          className="guess"
          wrap="nowrap"
          container
          direction="row"
          alignItems="center"
        >
          <Grid xs={10} sm={10} lg={10} xl={10} className="distance-bar" item>
            <animated.div
              className="fill"
              style={{
                ...props.springs[index],
                ...props.distanceBarSprings[index],
              }}
            >
              <animated.div style={props.schoolNameSprings[index]}>
                <Typography
                  color={
                    props.guesses[index].name === props.collegedle.name
                      ? "white"
                      : "black"
                  }
                  variant="body1"
                >
                  <b>{guess["name"]}</b>
                </Typography>
              </animated.div>
            </animated.div>
          </Grid>

          <Grid item>
            <Typography variant="body1" align="right" className="mile-marker">
              <animated.b>
                {props.springs[index].value.to((val) => Math.floor(val))}
              </animated.b>
              <b> mi</b>
            </Typography>
          </Grid>
        </Grid>

        <Typography variant="body1" className="hint">
          {getHint(guess, index)}
        </Typography>
      </div>
    );
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
        "Hint: Athletic conference is " + props.collegedle["athleticConference"]
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
