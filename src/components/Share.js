import { Container } from "@mui/system";
import { Grid, Box, Typography, Button } from "@mui/material";
import exit from "../images/icons/exit.png";
import { addRem } from "../util/addrem";
import { generateTheme } from "../util/createTheme";
import Countdown from "react-countdown";
import { getNextDate, shareText, generateEmojiBlocks } from "../util/share";
import Alert from "./Alert";
import { useState } from "react";
import ShareIcon from "@mui/icons-material/Share";
import { IN_PROGRESS, SPECIAL_MESSAGE_TEXT, WIN } from "../util/constants";
import { useAnalyticsEventTracker } from "../util/googleAnalytics";

function Share(props) {
  const [showCopyAlert, setShowCopyAlert] = useState(false);
  const [showCopyFailure, setShowCopyFailure] = useState(false);

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

  const gaEventTracker = useAnalyticsEventTracker();

  return (
    <Container maxWidth="xs">
      <Grid
        container
        alignItems="center"
        direction="column"
        justifyContent="center"
      >
        <Alert message={"Copied to clipboard"} showFade={showCopyAlert} />
        <Alert
          message={"Failed to copy to clipboard"}
          showFade={showCopyFailure}
        />
        <Box
          style={{
            backgroundColor: "white",
            boxShadow: "0 4px 23px 0 rgb(0 0 0 / 20%)",
            borderRadius: "8px",
            width: "100%",
            boxSizing: "border-box",
            marginTop: "25vh",
          }}
          sx={{ mb: 2, px: 4, pb: 4, mt: 10 }}
          className="modal"
        >
          <Grid
            style={{ borderBottom: "2px solid #f6f4f4" }}
            justifyContent="space-between"
            alignItems="center"
            container
            sx={{ pt: 2, pb: 1, mb: 1 }}
          >
            <ExitImage hidden="hidden"> </ExitImage>
            <Grid item>
              <Typography sx={{ m: 0, p: 0 }} variant="h4">
                <b> Statistics </b>
              </Typography>
            </Grid>
            <ExitImage></ExitImage>
          </Grid>
          {props.gameStatus === IN_PROGRESS ? (
            <Typography align="center">Statistics are a WIP</Typography>
          ) : (
            <Grid rowGap={2} container direction="column" alignItems="center">
              {" "}
              <Typography variant="body1" align="center">
                Next Collegedle in...
                <Countdown daysInHours={true} date={getNextDate()}></Countdown>
              </Typography>
              <Typography>
                Collegedle {props.gameID + "  "}
                {props.gameStatus === WIN ? props.guesses.length : "X"} / 6
              </Typography>
              <div>
                {generateEmojiBlocks(props.collegedle, props.guesses)
                  .split("\n")
                  .map((s) => (
                    <div>{s}</div>
                  ))}
              </div>
              <Button
                variant="contained"
                onClick={() => {
                  shareText(
                    props.collegedle,
                    props.gameID,
                    props.guesses,
                    props.gameStatus,
                    (shown) => setShowCopyAlert(shown),
                    (shown) => setShowCopyFailure(shown)
                  );
                  gaEventTracker("Click share button");
                }}
              >
                Share <ShareIcon></ShareIcon>
              </Button>
              <Typography variant="body1" align="center">
                <b>{SPECIAL_MESSAGE_TEXT}</b>
              </Typography>
            </Grid>
          )}
        </Box>
      </Grid>
    </Container>
  );
}

export default Share;
