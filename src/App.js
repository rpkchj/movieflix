import "./App.css";
import FilterHeader from "./components/FilterHeader/FilterHeader.jsx";
import MovieList from "./components/MovieList/MovieList.jsx";

function App() {
  return (
    <div className="App">
      <FilterHeader />
      <MovieList />
    </div>
  );
}

export default App;
