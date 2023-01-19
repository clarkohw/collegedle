import "./App.css";
import Game from "./components/Game";
import TopBar from "./components/TopBar";
import { Container } from "@mui/system";
import { generateTheme } from "./util/createTheme";
import { ThemeProvider } from "@mui/material";

function App() {
  return (
    <Container sx={{ mt: 3, mb: 3 }} maxWidth="lg">
      <ThemeProvider theme={generateTheme()}>
        <TopBar></TopBar>
        <Game />
      </ThemeProvider>
    </Container>
  );
}

export default App;
