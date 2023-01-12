import "./App.css";
import SearchBar from "./components/SearchBar";
import Map from "./components/Map";
import GuessList from "./components/GuessList";
import collegeData from "./data/colleges.json";
import { useState } from "react";

function App() {
  const [guessOptions, setGuessOptions] = useState(collegeData);
  return (
    <div className="app-container">
      <SearchBar
        guessOptions={guessOptions}
        setGuessOptions={setGuessOptions}
      />
      <Map />
      <GuessList />
    </div>
  );
}

export default App;
