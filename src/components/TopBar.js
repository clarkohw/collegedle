import { useEffect, useState } from "react";
import { addRem } from "../util/addrem";
import { generateTheme } from "../util/createTheme";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid } from "@mui/material";
import questionMark from "../images/icons/question-mark.png";
import { Container } from "@mui/system";
import Help from "./Help";
import Share from "./Share";
import { IN_PROGRESS } from "../util/constants";

function TopBar(props) {
  const isNewPlayer = () => {
    const localData = JSON.parse(localStorage.getItem("collegedle"));
    if (localData) {
      try {
        return localData["game"]["timestamps"]["lastPlayed"] === null;
      } catch {
        return true;
      }
    }
    return true;
  };

  const [open, setOpen] = useState(isNewPlayer());
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [shareModalOpen, setShareModalOpen] = useState(
    props.gameStatus !== IN_PROGRESS
  );
  const handleShareModalClose = () => setShareModalOpen(false);
  // const handleShareModalOpen = () => setShareModalOpen(true);

  useEffect(() => {
    setShareModalOpen(props.gameStatus !== IN_PROGRESS);
  }, [props.gameStatus]);

  return (
    <Container
      style={{
        paddingLeft: 0,
        paddingRight: 0,
        borderBottom: "2px solid #f6f4f4",
      }}
      sx={{ mb: 4, mt: 1, pb: 1 }}
    >
      <Grid
        container
        justifyContent="space-between"
        direction="row"
        alignItems="end"
      >
        <Typography style={{ visibility: "hidden" }} variant="h4">
          <img
            onClick={handleOpen}
            src={questionMark}
            style={{
              maxHeight: addRem(generateTheme().typography.h4.fontSize, -0.5),
            }}
            alt="invisible"
          />
        </Typography>
        <Typography variant="h4">
          <b>Collegedle</b>
        </Typography>
        <button
          style={{
            backgroundColor: "transparent",
            cursor: "pointer",
            stroke: "none",
            border: "none",
          }}
          onClick={handleOpen}
        >
          <Typography variant="h4">
            <img
              src={questionMark}
              style={{
                maxHeight: addRem(generateTheme().typography.h4.fontSize, -0.5),
              }}
              alt="question mark"
            />
          </Typography>
        </button>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Help handleClose={handleClose}></Help>
        </Modal>
        <Modal
          open={shareModalOpen}
          onClose={handleShareModalClose}
          aria-labelledby="Sharing modal"
          aria-describedby="A modal to share game results"
        >
          <Share
            gameID={props.gameID}
            gameStatus={props.gameStatus}
            guesses={props.guesses}
            handleClose={handleShareModalClose}
          ></Share>
        </Modal>
      </Grid>
    </Container>
  );
}

export default TopBar;
