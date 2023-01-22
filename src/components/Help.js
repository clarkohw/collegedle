import { Typography } from "@mui/material";
import { Grid } from "@mui/material";
import { Box, Container } from "@mui/system";
import exit from "../images/icons/exit.png";
import { addRem } from "../util/addrem";
import { generateTheme } from "../util/createTheme";

function Help(props) {
  const ExitImage = (exitProps) => (
    <Grid sx={{ pt: 0.5 }} item>
      <img
        src={exit}
        onClick={props.handleClose}
        style={{
          maxHeight: addRem(generateTheme().typography.h4.fontSize, -0.5),
          visibility: exitProps.hidden,
        }}
      />
    </Grid>
  );

  const Dot = (props) => (
    <Grid item xs={6}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <svg height={50} width={50}>
          <circle
            r={10}
            cx={25}
            cy={25}
            strokeWidth={2}
            stroke="black"
            fill={props.color}
          />
        </svg>
        <Typography align="center" variant="body2">
          {props.text}
        </Typography>
      </Grid>
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
          }}
          sx={{ mb: 2, px: 4, pb: 2 }}
          className="modal"
        >
          <Grid
            style={{ borderBottom: "2px solid #f6f4f4" }}
            justifyContent="space-between"
            alignItems="center"
            container
            sx={{ py: 1 }}
          >
            <ExitImage hidden="hidden"> </ExitImage>
            <Grid item>
              <Typography sx={{ m: 0, p: 0 }} variant="h4">
                <b> HOW TO PLAY </b>
              </Typography>
            </Grid>
            <ExitImage></ExitImage>
          </Grid>
          <Typography variant="h6">Guess the Collegedle in 6 tries.</Typography>
          <Typography variant="body1">
            <ul>
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
            <p>
              For example, if the mystery college was Stanford University. The
              following markers might appear on the map.
            </p>
          </Typography>
          <Grid container alignItems="center" justifyContent={"center"}>
            <Dot color="#FCEEAB" text="Brown University"></Dot>
            <Dot color="#EEC14E" text="University of Washington"></Dot>
            <Dot color="#EE8F4E" text="University of Southern California"></Dot>
            <Dot color="#D74031" text="University of California-Berkeley"></Dot>
          </Grid>
        </Box>
      </Grid>
    </Container>
  );
}

export default Help;
