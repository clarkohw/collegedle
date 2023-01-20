import { useState } from "react";
import { addRem } from "../util/addrem";
import { generateTheme } from "../util/createTheme";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import colorScale from "../images/color_scale.png";
import { Grid } from "@mui/material";
import questionMark from "../images/icons/question-mark.png";
import { Container } from "@mui/system";
const style = {
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  zIndex: 100,
  maxHeight: "100vh",
};

function TopBar() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
          />
        </Typography>
        <Typography variant="h4">
          <b>Collegedle</b>
        </Typography>
        <Typography variant="h4">
          <img
            onClick={handleOpen}
            src={questionMark}
            style={{
              maxHeight: addRem(generateTheme().typography.h4.fontSize, -0.5),
            }}
          />
        </Typography>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography id="modal-modal-title" variant="h4">
                How to play
              </Typography>
              <Button onClick={handleClose}>❌</Button>
            </div>

            <Typography
              variant="body2"
              id="modal-modal-description"
              sx={{ mt: 2 }}
            >
              Everyday there is a new mystery US college. Your goal is to guess
              which school it is in the fewest number of guesses. Each incorrect
              guess will appear on the map with a color indicating how close it
              is geographically to the target school. The hotter the color the
              closer you are to the answer.
            </Typography>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <img
                stye={{ objectFit: "contain" }}
                src={colorScale}
                alt="Color scale"
              ></img>
              <Button variant="contained" onClick={handleClose}>
                <Typography variant="h6">Play</Typography>
              </Button>
            </div>
          </Box>
        </Modal>
      </Grid>
    </Container>
  );
}

export default TopBar;
