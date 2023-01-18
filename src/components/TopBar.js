import { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import colorScale from "../images/color_scale.png";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  zIndex: 100,
};

function TopBar() {
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100vw",
      }}
    >
      <Button
        onClick={handleOpen}
        style={{ fontSize: "36px", visibility: "hidden" }}
      >
        ❓
      </Button>
      <h1>Collegedle</h1>
      <Button onClick={handleOpen} style={{ fontSize: "36px" }}>
        ❓
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              How to play
            </Typography>
            <Button onClick={handleClose}>X</Button>
          </div>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Everyday there is a new mystery US college. Your goal is to guess
            which school it is in the fewest number of guesses. Each incorrect
            guess will appear on the map with a color indicating how close it is
            geographically to the target school. The hotter the color the closer
            you are to the answer.
          </Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <img src={colorScale}></img>
            <Button onClick={handleClose}>play</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default TopBar;
