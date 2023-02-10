import SearchBar from "./SearchBar";
import namesList from "../data/college_names.json";
import Map from "./Map";
import GuessList from "./GuessList";
import collegeData from "../data/colleges.json";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import ConfettiShower from "./ConfettiShower";
import {
  BAR_FADE_DELAY,
  COLLEGEDLE_POOL,
  MAX_DISTANCE,
  OVERRIDE_COLLEGEDLE,
  WIN,
} from "../util/constants";
import TopBar from "./TopBar";
import moment from "moment";
import { useSprings } from "react-spring";
import { getColor } from "../util/color";

function Game() {
  const localData = JSON.parse(localStorage.getItem("collegedle"));
  const [guessOptions, setGuessOptions] = useState(collegeData);
  const gameID = Math.floor((moment() - moment("20230101")) / 86400000);
  const generateCollegedle = () => {
    const today = new Date(Date.now());
    const index = OVERRIDE_COLLEGEDLE
      ? OVERRIDE_COLLEGEDLE
      : (today.getFullYear() * (today.getDate() + today.getMonth() + 1)) %
        COLLEGEDLE_POOL;
    return guessOptions.find((item) => item.name === namesList[index]);
  };
  const [collegedle, setCollegedle] = useState(generateCollegedle());
  const resetState = !localData || localData["game"]["id"] !== gameID;
  const [guesses, setGuesses] = useState(
    resetState ? [] : localData["game"]["guesses"]
  );
  const [gameState, setGameState] = useState(
    resetState ? 0 : localData["game"]["status"]
  );

  const [springs, api] = useSprings(
    guesses.length,
    (index) => {
      const correct = guesses[index].name === collegedle.name;
      return {
        from: {
          width: "0%",
          value: correct ? MAX_DISTANCE : 0,
        },
        to: {
          width: correct
            ? "100%"
            : (1 - guesses[index].distance / MAX_DISTANCE) * 100 + "%",
          value: guesses[index]["distance"],
        },
        config: {
          tension: 60,
        },
      };
    },
    [guesses]
  );

  const [schoolNameSprings] = useSprings(guesses.length, () => ({
    delay: BAR_FADE_DELAY,
    from: { opacity: 0 },
    to: { opacity: 1 },
  }));

  const [distanceBarSprings] = useSprings(guesses.length, (index) => {
    const correct = guesses[index].name === collegedle.name;
    const color = getColor(guesses[index], collegedle);
    return {
      delay: BAR_FADE_DELAY,
      from: { background: color },
      to: { background: correct ? color : "none" },
    };
  });

  useEffect(() => {
    localStorage.setItem(
      "collegedle",
      JSON.stringify({
        game: {
          id: gameID,
          guesses: guesses,
          status: gameState,
          timestamps: {
            lastPlayed: Date.now(),
          },
        },
      })
    );
  }, [gameID, guesses, gameState]);

  return (
    <div>
      <TopBar gameStatus={gameState} gameID={gameID} guesses={guesses}></TopBar>
      <Container maxWidth="xs">
        <ConfettiShower run={gameState === WIN} />
        <SearchBar
          animateSprings={api.start()}
          collegedle={collegedle}
          setCollegedle={setCollegedle}
          gameState={gameState}
          setGameState={setGameState}
          guessOptions={guessOptions}
          setGuessOptions={setGuessOptions}
          guesses={guesses}
          setGuesses={setGuesses}
        />
      </Container>

      <Grid
        container
        style={{ marginTop: ".8em" }}
        direction={"row"}
        spacing={2}
        alignItems="center"
      >
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Map collegedle={collegedle} guesses={guesses} />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <GuessList
            schoolNameSprings={schoolNameSprings}
            distanceBarSprings={distanceBarSprings}
            springs={springs}
            collegedle={collegedle}
            guesses={guesses}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default Game;
