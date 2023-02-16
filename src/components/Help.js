import { Button, Typography } from "@mui/material";
import { Grid } from "@mui/material";
import { Box, Container } from "@mui/system";
import exit from "../images/icons/exit.png";
import { addRem } from "../util/addrem";
import { generateTheme } from "../util/createTheme";
import Divider from "@mui/material/Divider";
import searchBarGif from "../images/search-bar.gif";
import guessMapGif from "../images/guess-map.gif";
import guessInfoGif from "../images/guess-info.gif";
import correctGuessGif from "../images/correct-guess.gif";
import "./Help.css";

function Help(props) {
  const ExitImage = (exitProps) => (
    <Grid sx={{ pt: 0.5 }} item>
      <button
        style={{
          backgroundColor: "transparent",
          cursor: "pointer",
          stroke: "none",
          border: "none",
        }}
        onClick={props.handleClose}
      >
        <img
          src={exit}
          alt={exitProps.hidden + "exit image"}
          style={{
            maxHeight: addRem(generateTheme().typography.h4.fontSize, -0.5),
            visibility: exitProps.hidden,
          }}
        />
      </button>
    </Grid>
  );

  return (
    <Container maxWidth="xs">
      <Grid
        container
        style={{ height: "100vh" }}
        direction="column"
        justifyContent="end"
      >
        <Box
          style={{
            backgroundColor: "white",
            boxShadow: "0 4px 23px 0 rgb(0 0 0 / 20%)",
            borderRadius: "8px",
            overflow: "scroll",
          }}
          sx={{ mb: 2, px: 4, pb: 4, mt: 10 }}
          className="modal"
        >
          <Grid
            style={{ borderBottom: "2px solid #f6f4f4" }}
            justifyContent="space-between"
            alignItems="center"
            container
            sx={{ pb: 1, pt: 2 }}
          >
            <ExitImage hidden="hidden"> </ExitImage>
            <Grid item>
              <Typography sx={{ m: 0, p: 0 }} variant="h4">
                <b> How To Play</b>
              </Typography>
            </Grid>
            <ExitImage></ExitImage>
          </Grid>
          <Typography variant="h6">Guess the Collegedle in 6 tries.</Typography>
          <Typography variant="body1">
            <ul style={{ paddingLeft: 16 }}>
              <li>Each guess must be a valid US college.</li>
              <li>
                The color of the dots on the map shows the distance from the
                target school
              </li>
              <li>The hotter the color, the closer you are to the answer.</li>
            </ul>
            <p>
              The guess will also appear in the guess list with a distance from
              the mystery school.
            </p>
          </Typography>
          <Typography sx={{ mt: 2 }}>
            <b>Make your guess:</b>
          </Typography>
          <img className="tutorial-gif" alt="seach bar" src={searchBarGif} />
          <Typography sx={{ mt: 2 }}>
            <b>Your guess appears on the map</b>
          </Typography>
          <img className="tutorial-gif" alt="guess on map" src={guessMapGif} />
          <Typography sx={{ mt: 2 }}>
            <b>And in the guess list</b>
          </Typography>
          <img className="tutorial-gif" alt="guess info" src={guessInfoGif} />
          <Typography sx={{ mt: 2 }}>
            <b>Solve the puzzle!</b>
          </Typography>
          <img
            className="tutorial-gif"
            alt="correct guess"
            src={correctGuessGif}
          />
          <Grid container direction="row" justifyContent="center">
            <Button
              onClick={props.handleClose}
              sx={{ mt: 4, mb: 2 }}
              variant="contained"
            >
              click to play!
            </Button>
          </Grid>

          <Divider sx={{ my: 2 }} />
          <Typography sx={{ py: 2 }} variant="body1">
            Have feedback? Email me at collegedle17@gmail.com
          </Typography>
        </Box>
      </Grid>
    </Container>
  );
}

export default Help;
