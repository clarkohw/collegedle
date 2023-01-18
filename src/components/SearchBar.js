import { Autocomplete, createFilterOptions } from "@mui/material";
import { matchSorter } from "match-sorter";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function SearchBar(props) {
  const initialSeachValue = {
    label: "",
    id: 999,
  };
  const [searchValue, setSearchValue] = useState(initialSeachValue);
  const submitGuess = () => {
    if (searchValue["label"] !== "") {
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
      setSearchValue(initialSeachValue);
      if (searchValue["label"] === props.collegedle["name"]) {
        props.setGameState("Won");
      } else {
        if (props.guesses.length + 1 >= 6) {
          props.setGameState("Lost");
        }
      }
    }
  };
  const displayWinLossMessage = () => {
    let text = "";
    if (props.gameState === "Won") {
      text = (
        <b style={{ color: "#3E9614" }}>
          You guessed today's Collegedle: {props.collegedle["name"]}
        </b>
      );
    } else if (props.gameState === "Lost") {
      text = (
        <b>
          {" "}
          Ahhh, you ran out of guesses :( The collegedle was:{" "}
          {props.collegedle["name"]}
        </b>
      );
    }
    return <div style={{ minHeight: "20px", marginTop: ".8em" }}>{text}</div>;
  };

  const filterOptions = (options, { inputValue }) => {
    return matchSorter(options, inputValue, {
      keys: ["label", "commonName"],
    });
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div style={{ width: "100%", display: "flex" }}>
        <Autocomplete
          disabled={props.gameState !== "In progress"}
          filterOptions={filterOptions}
          fullWidth
          value={searchValue}
          onChange={(e, newValue) => setSearchValue(newValue)}
          id="college-guess-search"
          isOptionEqualToValue={(option1, option2) =>
            option1["label"] === option2["label"]
          }
          options={props.guessOptions.map((college, index) => ({
            label: college["name"],
            id: index,
            commonName:
              college["commonName"] === "NA" ? "" : college["commonName"],
          }))}
          renderInput={(params) => (
            <TextField
              {...params}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  submitGuess();
                }
              }}
              label="Enter college name"
              variant="filled"
              // InputProps={{ disableUnderline: true }}
              style={{ borderRadius: "8px" }}
            />
          )}
        />
        <Button
          style={{ marginLeft: "10px" }}
          variant="contained"
          onClick={submitGuess}
        >
          <b>Guess</b>
        </Button>
      </div>
      {displayWinLossMessage()}
    </div>
  );
}

export default SearchBar;
