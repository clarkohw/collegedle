import { Autocomplete } from "@mui/material";
import { matchSorter } from "match-sorter";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { IN_PROGRESS, LOSS, MAX_GUESSES, WIN } from "../util/constants";
import { getDistance } from "../util/distance";
import { useAnalyticsEventTracker } from "../util/googleAnalytics";

function SearchBar(props) {
  const gaEventTracker = useAnalyticsEventTracker();

  const initialSeachValue = {
    label: "",
    id: 999,
  };
  const [searchValue, setSearchValue] = useState(initialSeachValue);
  const submitGuess = () => {
    if (searchValue["label"] !== "") {
      const guess = props.guessOptions[searchValue["id"]];
      props.setGuesses([
        ...props.guesses,
        {
          ...guess,
          distance: Math.round(
            getDistance(
              guess["latitude"],
              guess["longitude"],
              props.collegedle["latitude"],
              props.collegedle["longitude"]
            )
          ),
        },
      ]);
      props.setGuessOptions(
        props.guessOptions.filter(
          (option) => option["name"] !== searchValue["label"]
        )
      );
      setSearchValue(initialSeachValue);
      if (searchValue["label"] === props.collegedle["name"]) {
        props.setGameState(WIN);
        gaEventTracker("Win");
      } else {
        if (props.guesses.length + 1 >= MAX_GUESSES) {
          props.setGameState(LOSS);
        }
      }
    }
  };
  const displayWinLossMessage = () => {
    let text = "";
    if (props.gameState === WIN) {
      text = (
        <b style={{ color: "#3E9614" }}>
          You guessed today's Collegedle: {props.collegedle["name"]}
        </b>
      );
    } else if (props.gameState === LOSS) {
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
          filterSelectedOptions
          disabled={props.gameState !== IN_PROGRESS}
          filterOptions={filterOptions}
          fullWidth
          value={searchValue}
          onChange={(e, newValue) => setSearchValue(newValue)}
          id="college-guess-search"
          isOptionEqualToValue={(option1, option2) =>
            option1["label"] === option2["label"]
          }
          options={props.guessOptions
            .map((college, index) => ({
              label: college["name"],
              id: index,
              commonName:
                college["commonName"] === "NA" ? "" : college["commonName"],
            }))
            .concat([initialSeachValue])}
          renderInput={(params) => (
            <TextField
              {...params}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  submitGuess();
                }
              }}
              placeholder="Enter college name"
              style={{ borderRadius: "8px" }}
              sx={{
                "& fieldset": { border: "none" },
              }}
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
