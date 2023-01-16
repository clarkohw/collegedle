import "./App.css";
import Game from "./components/Game";
import TopBar from "./components/TopBar";

function App() {
  return (
    <div className="app-container">
      <TopBar></TopBar>
      <Game />
    </div>
  );
}

export default App;
