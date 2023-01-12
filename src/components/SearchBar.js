import { Autocomplete } from "@mui/material";
import { useState } from "react";
import TextField from "@mui/material/TextField";

function SearchBar(props) {
  const [searchValue, setSearchValue] = useState("");
  return (
    <div style={{ display: "flex" }}>
      <Autocomplete
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
      <button
        onClick={() => {
          if (searchValue !== "") {
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
          }
        }}
      >
        Guess
      </button>
    </div>
  );
}

export default SearchBar;
