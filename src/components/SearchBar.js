import { Autocomplete } from "@mui/material";
import { useState } from "react";
import TextField from "@mui/material/TextField";

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
        if (props.guesses.length + 1 >= 5) {
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
      text = <b> Ahhh, you ran out of guesses :(</b>;
    }
    return <div style={{ minHeight: "20px", marginTop: ".8em" }}>{text}</div>;
  };
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
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
          options={[
            initialSeachValue,
            ...props.guessOptions.map((college, index) => ({
              label: college["name"],
              id: index,
            })),
          ]}
          renderInput={(params) => (
            <TextField {...params} label="Enter college name" />
          )}
        />
        <button onClick={submitGuess}>Guess</button>
      </div>
      {displayWinLossMessage()}
    </div>
  );
}

export default SearchBar;
