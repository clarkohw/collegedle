import "./App.css";
import Game from "./components/Game";
import { Container } from "@mui/system";
import { generateTheme } from "./util/createTheme";
import { ThemeProvider } from "@mui/material";

function App() {
  return (
    <Container sx={{ mb: 3 }} maxWidth="lg">
      <ThemeProvider theme={generateTheme()}>
        <Game />
      </ThemeProvider>
    </Container>
  );
}

export default App;
