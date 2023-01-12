import "./App.css";
import SearchBar from "./components/SearchBar";
import Map from "./components/Map";
import GuessList from "./components/GuessList";

function App() {
  return (
    <div className="app-container">
      <SearchBar />
      <Map />
      <GuessList />
    </div>
  );
}

export default App;
