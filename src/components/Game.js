import SearchBar from "./SearchBar";
import Map from "./Map";
import GuessList from "./GuessList";
import collegeData from "../data/colleges.json";
import { useState } from "react";

function Game() {
  const [guessOptions, setGuessOptions] = useState(collegeData);
  //   const [collegedle, setCollegedle] = useState({});
  const [collegedle, setCollegedle] = useState(
    guessOptions[Math.round(Math.random() * guessOptions.length)]
  );
  const [guesses, setGuesses] = useState([]);
  const [gameState, setGameState] = useState("In progress");
  const [guessCount, setGuessCount] = useState(0);

  console.log("devlog gamestate:", gameState, guessCount);
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
