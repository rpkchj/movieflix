import { useEffect, useRef, useState } from 'react';
import './App.css';
import MovieCard from './components/common/MovieCard/MovieCard';
import { getMovies } from './services/movieService';

function App() {
  const flag = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  let lastScrollPosition = 0;

const callToGetMovies = () => {
  setIsLoading(true)
  getMovies().then(movie => {
    console.log("movies", movie.results)
    setIsLoading(false)
  })
  
}

const handleScroll = () => {
  const currentScrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

  if (currentScrollPosition > lastScrollPosition && (window.innerHeight + currentScrollPosition >= document.documentElement.offsetHeight) && !isLoading) {
    // Scrolling downwards
    callToGetMovies()
  } else if (currentScrollPosition < lastScrollPosition && currentScrollPosition === 0 && !isLoading) {
    // Scrolling upwards and reached the top
    callToGetMovies()

  }

  lastScrollPosition = currentScrollPosition;
};

useEffect(() => {
  if(!flag.current){ //this useRef is used to prevent the native behaviour of useEffect, which calls the API twice on mount.
    callToGetMovies()
    return () => flag.current = true
  }
},[])

useEffect(() => {
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);


  return (
    <div className="App">
      <MovieCard/>      
    </div>
  );
}

export default App;
