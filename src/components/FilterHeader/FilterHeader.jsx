import React, { useEffect, useRef, useState } from "react";
import { filterByGenreID, getGenre, getMovies } from "../../services/movieService";
import Button from "../common/Button/Button";
import "./filterheader.css";
import { useDispatch } from "react-redux";
import { storeGenres, storeMovies, manipulateSelectedGenres } from "../../slice/movieSlice";

const FilterHeader = () => {
  const flag = useRef(false);
  const dispatch = useDispatch();
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const callToGetGenres = () => {
    let genreObj = {}
    getGenre().then((genre) => {
      genre.genres.map(genre => {
        genreObj[genre.id] = genre.name
      }) //making the genre structure as {id: name} for easy retireval in MovieList component
      dispatch(storeGenres(genreObj));
      setGenres(genre.genres);
    });
  };

  useEffect(() => {
    if (!flag.current) {
      callToGetGenres();
      return () => (flag.current = true);
    }
  }, []);

  // constructing the query params of ids separated by comma
  const constructGenreList = (genreList) => {
    let queryString = "";
    genreList.map((id) => (queryString += `${id},`));
    return queryString;
  };

  return (
    <div className="filter_header">
      {genres.map((genre) => {
        const selectGenre = () => {
          if (!selectedGenres.includes(genre.id)) {
            
            let temp = [...selectedGenres, genre.id];
            
            dispatch(manipulateSelectedGenres(temp)) //keeping a track of selected genres globally

            filterByGenreID(constructGenreList(temp)).then((list) =>
              dispatch(storeMovies(list.results))
            );
            
            setSelectedGenres((prev) => [...prev, genre.id]);
          } else {
            let tmp = selectedGenres.filter((genreID) => genreID !== genre.id);

            dispatch(manipulateSelectedGenres(tmp))//keeping a track of selected genres globally
            
            if(tmp.length <= 0) { //check to see if my selected genres list are empty then call the original api for 2012 movie list
              getMovies().then(movie => dispatch(storeMovies(movie.results)))
            }else{

              filterByGenreID(constructGenreList(tmp)).then((list) =>
                dispatch(storeMovies(list.results))
            );
          }
            setSelectedGenres(tmp);
          }
        };
        return (
          <Button
            key={genre.id}
            title={genre.name}
            onButtonClick={selectGenre}
            isSelected={selectedGenres.includes(genre.id)}
          />
        );
      })}
    </div>
  );
};

export default FilterHeader;
