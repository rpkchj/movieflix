import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../../services/movieService";
import {
  storeMovies,
  storeNewerMovies,
  storeOlderMovies,
} from "../../slice/movieSlice";
import MovieCard from "../common/MovieCard/MovieCard";
import Loader from "../Loader/Loader";

// Variables to track the current OLDER and NEWER movie list to be fetched
let PREV_YEAR = 2012;
let NEXT_YEAR = 2012;

let IS_GENRE = false

const MovieList = () => {
  const dispatch = useDispatch();
  const flag = useRef(false);
  const currentlySelectedGenres = useSelector(state => state.movieSlice.selectedGenres)
  const availableGenres = useSelector(state => state.movieSlice.genres)
  const movieList = useSelector((state) => state.movieSlice.movies);
  const [isLoading, setIsLoading] = useState(false);

  // this is to check if there are any selected genre(s) then set this flag and based on this do not call api because api doesn't have property to call old / new movies by year whilst maintaining the genre filters
  if(currentlySelectedGenres.length > 0){
    PREV_YEAR = 2012
    NEXT_YEAR = 2012
    IS_GENRE = true
  }else{
    IS_GENRE = false
  }

  const callToGetMovies = (callFlag, movieYear) => {
    
    setIsLoading(true);

    switch (callFlag) {
      case "Newer":
        getMovies(movieYear).then((movie) => {
          dispatch(storeNewerMovies(movie.results));
          setIsLoading(false);
        });
        break;
      case "Older":
        getMovies(movieYear).then((movie) => {
          dispatch(storeOlderMovies(movie.results));
          setIsLoading(false);
        });
        break;
      default:
        getMovies().then((movie) => {
          dispatch(storeMovies(movie.results));
          setIsLoading(false);
        });
        break;
    }
  };



  let lastScrollPosition = 0;


  const handleScroll = () => {
    const currentScrollPosition =
      document.documentElement.scrollTop || document.body.scrollTop;
      

    if (
      currentScrollPosition > lastScrollPosition &&
      window.innerHeight + currentScrollPosition >=
        document.documentElement.offsetHeight &&
      !isLoading
    ) {
      if(IS_GENRE) return //if there are any selected genres do not call the prev year api. because the genre filter api does not have the property to fetch older data whilst maintaining the genre filter
      // Scrolling downwards
      let tmp = ++NEXT_YEAR;
      if (tmp > new Date().getFullYear()) return; //do not call api for years after current.
      callToGetMovies("Newer", tmp);
    } else if (
      currentScrollPosition < lastScrollPosition &&
      currentScrollPosition === 0 &&
      !isLoading
    ) {
      if(IS_GENRE) return //if there are any selected genres do not call the next year api. because the genre filter api does not have the property to fetch newer data whilst maintaining the genre filter
      // Scrolling upwards and reached the top
      callToGetMovies("Older", --PREV_YEAR);
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

  const adultRatings = {
    true: "R",
    false: "PG"
  }

  return (
    <>
     
      {movieList.map((movie) => {
        let constructedGenre="";
        let {genre_ids} = movie

        genre_ids.map(id => {
          // if condition just to make sure that the costructed genre does not have any trailing commas
          if(genre_ids[genre_ids.length - 1] === id){
            constructedGenre += `${availableGenres[id]}`
          }else{
            constructedGenre += `${availableGenres[id]},`
          }
        })
        

        return (
          <MovieCard
            summary={movie.overview}
            title={movie.title}
            movieBanner={movie.poster_path}
            popularity={movie.popularity}
            releaseYear={movie.release_date.split("-")[0]}
            adultRating={adultRatings[movie.adult]}
            movieGenre={constructedGenre}
          />
        );
      })}
     
    </>
  );
};

export default MovieList;
