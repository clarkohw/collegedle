import SearchBar from "./SearchBar";
import namesList from "../data/college_names.json";
import Map from "./Map";
import GuessList from "./GuessList";
import collegeData from "../data/colleges.json";
import { useState } from "react";

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
  const [guesses, setGuesses] = useState([]);
  const [gameState, setGameState] = useState("In progress");
  const [guessCount, setGuessCount] = useState(0);

  return (
    <div>
      <SearchBar
        collegedle={collegedle}
        setCollegedle={setCollegedle}
        gameState={gameState}
        setGameState={setGameState}
        guessCount={guessCount}
        setGuessCount={setGuessCount}
        guessOptions={guessOptions}
        setGuessOptions={setGuessOptions}
        guesses={guesses}
        setGuesses={setGuesses}
      />
      <Map collegedle={collegedle} guesses={guesses} />
      <GuessList collegedle={collegedle} guesses={guesses} />
    </div>
  );
}

export default Game;
