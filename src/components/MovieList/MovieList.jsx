import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../../services/movieService";
import {
  storeMovies,
  storeNewerMovies,
  storeOlderMovies,
} from "../../slice/movieSlice";
import MovieCard from "../common/MovieCard/MovieCard";

const MovieList = () => {
  const dispatch = useDispatch();
  const flag = useRef(false);
  const movieList = useSelector((state) => state.movieSlice.movies);
  const [isLoading, setIsLoading] = useState(false);

  const callToGetMovies = (callFlag) => {
    setIsLoading(true);
    getMovies().then((movie) => {
      // console.log("movies", movie.results)
      const { results } = movie;
      switch (callFlag) {
        case "Newer":
          dispatch(storeNewerMovies(results));
          break;
        case "Older":
          dispatch(storeOlderMovies(results));
          break;
        default:
          dispatch(storeMovies(results));
          break;
      }
      setIsLoading(false);
    });
  };

  let lastScrollPosition = 0;

 

  const handleScroll = () => {
    const currentScrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
  
    if (currentScrollPosition > lastScrollPosition && (window.innerHeight + currentScrollPosition >= document.documentElement.offsetHeight) && !isLoading) {
      // Scrolling downwards
      callToGetMovies("Newer");
    } else if (currentScrollPosition < lastScrollPosition && currentScrollPosition === 0 && !isLoading) {
      // Scrolling upwards and reached the top
      callToGetMovies("Older");
    }
  
    lastScrollPosition = currentScrollPosition;
  };


  useEffect(() => {
    if (!flag.current) {
      //this useRef is used to prevent the native behaviour of useEffect, which calls the API twice on mount.
      callToGetMovies("Neutral");
      return () => (flag.current = true);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  return (
  
    <>
      {movieList.map((movie) => {
          return (
              <MovieCard
              summary={movie.overview}
              title={movie.title}
              movieBanner={movie.poster_path}
              popularity={movie.popularity}
              />
            );
        })}
        </>
  );
};

export default MovieList;
