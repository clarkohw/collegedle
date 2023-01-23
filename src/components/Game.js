import SearchBar from "./SearchBar";
import namesList from "../data/college_names.json";
import Map from "./Map";
import GuessList from "./GuessList";
import collegeData from "../data/colleges.json";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import ConfettiShower from "./ConfettiShower";
import { COLLEGEDLE_POOL, WIN } from "../util/constants";

function Game() {
  const localData = JSON.parse(localStorage.getItem("collegedle"));
  const [guessOptions, setGuessOptions] = useState(collegeData);
  const gameID = Math.floor((Date.now() - new Date("01-01-2023")) / 86400000);
  const generateCollegedle = () => {
    const today = new Date(Date.now());
    const index =
      (today.getFullYear() * (today.getDate() + today.getMonth() + 1)) %
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
