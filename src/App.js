import "./App.css";
import SearchBar from "./components/SearchBar";
import Map from "./components/Map";
import GuessList from "./components/GuessList";
import collegeData from "./data/colleges.json";
import { useState } from "react";

function App() {
  const [guessOptions, setGuessOptions] = useState(collegeData);
  const [collegedle, setCollegedle] = useState(guessOptions[0]);
  const [guesses, setGuesses] = useState([]);
  return (
    <div className="app-container">
      <h1>
        <b>Collegedle</b>
      </h1>
      <SearchBar
        guessOptions={guessOptions}
        setGuessOptions={setGuessOptions}
        guesses={guesses}
        setGuesses={setGuesses}
      />
      {guesses.map((guess) => (
        <div>{guess["name"]}</div>
      ))}
      <Map collegedle={collegedle} guesses={guesses} />
      <GuessList />
    </div>
  );
}

export default App;
