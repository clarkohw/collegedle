import { useState } from "react";
import { addRem } from "../util/addrem";
import { generateTheme } from "../util/createTheme";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid } from "@mui/material";
import questionMark from "../images/icons/question-mark.png";
import { Container } from "@mui/system";
import Help from "./Help";
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
            alt="invisible"
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
            alt="question mark"
          />
        </Typography>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          hideBackdrop
          aria-describedby="modal-modal-description"
        >
          <Help handleClose={handleClose}></Help>
        </Modal>
      </Grid>
    </Container>
  );
}

export default TopBar;
