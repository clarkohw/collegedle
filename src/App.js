import "./App.css";
import SearchBar from "./components/SearchBar";
import Map from "./components/Map";
import GuessList from "./components/GuessList";
import collegeData from "./data/colleges.json";
import { useState } from "react";

function App() {
  const [guessOptions, setGuessOptions] = useState(collegeData);
  const [collegedle, setCollegedle] = useState(
    guessOptions[Math.round(Math.random() * guessOptions.length)]
  );
  const [guesses, setGuesses] = useState([]);
  const [gameState, setGameState] = useState("In progress");
  const [guessCount, setGuessCount] = useState(0);
  console.log("devlog gamestate:", gameState, guessCount);
  return (
    <div className="app-container">
      <h1>
        <b>Collegedle</b>
      </h1>
      <SearchBar
        collegedle={collegedle}
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

export default App;
