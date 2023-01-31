import "./App.css";
import Game from "./components/Game";
import { Container } from "@mui/system";
import { generateTheme } from "./util/createTheme";
import { ThemeProvider } from "@mui/material";
import ReactGA from "react-ga";
import { useEffect } from "react";

function App() {
  ReactGA.initialize(process.env.REACT_APP_TRACKING_ID);
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <Container sx={{ mb: 3 }} maxWidth="lg">
      <ThemeProvider theme={generateTheme()}>
        <Game />
      </ThemeProvider>
    </Container>
  );
}

export default App;
