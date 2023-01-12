import { Autocomplete } from "@mui/material";
import { useState } from "react";
import TextField from "@mui/material/TextField";

function SearchBar(props) {
  const [searchValue, setSearchValue] = useState("");
  const submitGuess = () => {
    if (searchValue !== "") {
      props.setGuessCount(props.guessCount + 1);
      props.setGuesses([
        ...props.guesses,
        props.guessOptions[searchValue["id"]],
      ]);
      props.setGuessOptions(
        props.guessOptions.filter(
          (option) => option["name"] !== searchValue["label"]
        )
      );
      setSearchValue("");
      if (searchValue["label"] === props.collegedle["name"]) {
        props.setGameState("Won");
      }
    }
  };
  return (
    <div style={{ display: "flex" }}>
      <Autocomplete
        disabled={props.gameState !== "In progress"}
        sx={{ width: 300 }}
        value={searchValue}
        onChange={(e, newValue) => setSearchValue(newValue)}
        id="college-guess-search"
        isOptionEqualToValue={(option1, option2) =>
          option1["label"] === option2["label"]
        }
        options={props.guessOptions.map((college, index) => ({
          label: college["name"],
          id: index,
        }))}
        renderInput={(params) => (
          <TextField {...params} label="Enter college name" />
        )}
      />
      <button onClick={submitGuess}>Guess</button>
    </div>
  );
}

export default SearchBar;
