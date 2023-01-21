import SearchBar from "./SearchBar";
import namesList from "../data/college_names.json";
import Map from "./Map";
import GuessList from "./GuessList";
import collegeData from "../data/colleges.json";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import ConfettiShower from "./ConfettiShower";
import { IN_PROGRESS, WIN } from "../util/constants";

function Game() {
  const [guessOptions, setGuessOptions] = useState(collegeData);
  const generateCollegedle = () => {
    const softLaunch = 110;
    const today = new Date(Date.now());
    const index =
      (today.getFullYear() * (today.getDate() + today.getMonth() + 1)) %
      softLaunch;
    return guessOptions.find((item) => item.name === namesList[index]);
  };
  const [collegedle, setCollegedle] = useState(generateCollegedle());
  const [guesses, setGuesses] = useState(
    JSON.parse(localStorage.getItem("guesses")) || []
  );
  const [gameState, setGameState] = useState(
    JSON.parse(localStorage.getItem("gameState")) || IN_PROGRESS
  );
  console.log(gameState);
  useEffect(() => {
    localStorage.setItem("guesses", JSON.stringify(guesses));
  }, [guesses]);
  useEffect(() => {
    localStorage.setItem("gameState", JSON.stringify(gameState));
  }, [gameState]);
  return (
    <div>
      <Container maxWidth="xs">
        <ConfettiShower run={gameState === WIN} />
        <SearchBar
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
          <GuessList collegedle={collegedle} guesses={guesses} />
        </Grid>
      </Grid>
    </div>
  );
}

export default Game;
