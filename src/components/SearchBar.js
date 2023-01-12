import { Autocomplete } from "@mui/material";
import { useState } from "react";
import TextField from "@mui/material/TextField";

function SearchBar(props) {
  const initialSearchState = {
    label: "Enter college name",
    id: -1,
  };
  const [searchValue, setSearchValue] = useState(initialSearchState);
  console.log("DEVLOG", props.guessOptions);
  return (
    <div style={{ display: "flex" }}>
      <Autocomplete
        sx={{ width: 300 }}
        value={searchValue}
        onChange={(e, newValue) => setSearchValue(newValue)}
        id="college-guess-search"
        options={props.guessOptions.map((college, index) => ({
          label: college["name"],
          id: index,
        }))}
        renderInput={(params) => <TextField {...params} label="text" />}
      />
      <button
        onClick={() => {
          props.setGuessOptions(
            props.guessOptions.filter(
              (option) => option["name"] !== searchValue["label"]
            )
          );
          setSearchValue(initialSearchState);
        }}
      >
        Guess
      </button>
    </div>
  );
}

export default SearchBar;
