import "./App.css";
import Game from "./components/Game";
import TopBar from "./components/TopBar";
import { Container } from "@mui/system";
import { Grid } from "@mui/material";

function App() {
  return (
    <Container maxWidth="md">
      <TopBar></TopBar>
      <Game />
    </Container>
  );
}

export default App;
