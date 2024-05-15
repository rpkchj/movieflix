import "./App.css";
import FilterHeader from "./components/FilterHeader/FilterHeader.jsx";
import Loader from "./components/Loader/Loader.jsx";
import { lazy, Suspense } from "react";

const MovieListLazy = lazy(() => import('./components/MovieList/MovieList.jsx'))

function App() {
  return (
    <div className="App">
      <FilterHeader />
      <Suspense fallback={<Loader/>}>
      <MovieListLazy />
      </Suspense>
    </div>
  );
}

export default App;
