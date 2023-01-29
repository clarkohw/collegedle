import { Fade, Typography } from "@mui/material";

function Alert(props) {
  return (
    <Fade in={props.showFade}>
      <Typography
        style={{
          backgroundColor: "black",
          color: "white",
          padding: "5px",
          borderRadius: "8px",
          maxWidth: "200px",
        }}
        align="center"
        variant="body1"
      >
        {props.message}
      </Typography>
    </Fade>
  );
}

export default Alert;
