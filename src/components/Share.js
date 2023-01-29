import { Container } from "@mui/system";
import { Grid, Box, Typography, Button } from "@mui/material";
import exit from "../images/icons/exit.png";
import { addRem } from "../util/addrem";
import { generateTheme } from "../util/createTheme";
import Countdown from "react-countdown";
import { getNextDate, shareText } from "../util/share";
import Alert from "./Alert";
import { useState } from "react";
import ShareIcon from "@mui/icons-material/Share";

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

  return (
    <Container maxWidth="xs">
      <Grid
        container
        style={{ height: "100vh" }}
        direction="column"
        justifyContent="center"
        alignItems="center"
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
          }}
          sx={{ mb: 2, px: 4, pb: 2 }}
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
                <b> Statistics </b> (WIP)
              </Typography>
            </Grid>
            <ExitImage></ExitImage>
          </Grid>
          <Grid rowGap={2} container direction="column" alignItems="center">
            <Typography variant="body1" align="center">
              Next Collegedle in...
              <Countdown daysInHours={true} date={getNextDate()}></Countdown>
            </Typography>
            <Button
              variant="contained"
              onClick={() =>
                shareText(
                  props.gameID,
                  props.guesses,
                  props.gameStatus,
                  (shown) => setShowCopyAlert(shown)
                )
              }
            >
              Share <ShareIcon></ShareIcon>
            </Button>
          </Grid>
        </Box>
      </Grid>
    </Container>
  );
}

export default Share;
