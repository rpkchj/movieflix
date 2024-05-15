import React from 'react'
import "./moviecard.css"
import { IoStarSharp } from "react-icons/io5";



const MovieCard = ({title, summary, movieBanner, popularity, adultRating, movieGenre, releaseYear}) => {

  const limitCharaters = (string, limit = 15) => {
    return string.length < limit? string.substring(0, limit) :`${string.substring(0, limit)}...`;
  };

  return (
    <>

  <div class="cellphone-container">    
      <div class="movie">       
        <div class="movie-img">
          <img alt='banner' src={`https://image.tmdb.org/t/p/original/${movieBanner}`} className='image_banner'/>
        </div>
        <div class="text-movie-cont">
          <div class="mr-grid">
            <div class="col1">
              <h1 title={title}>{title}</h1>
              <ul class="movie-gen">
                <li>{releaseYear}  /</li>
                <li>{adultRating}  /</li>
                <li title={movieGenre}>{limitCharaters(movieGenre, 25)}</li>
              </ul>
            </div>
          </div>
          <div class="mr-grid summary-row">
            <div class="col2">
              <h5>SUMMARY</h5>
            </div>
            <div class="col2">
               <ul class="movie-likes">
                <li className='movie_votes'><IoStarSharp size={17}/><p>{parseInt(popularity)}</p></li>
                
              </ul>
            </div>
          </div>
          <div class="mr-grid">
            <div class="col1 fade_hide_extra">
              <p class="movie-description">{summary}</p>
            </div>
          </div>
          {/* <div class="mr-grid actors-row">
            <div class="col1">
              <p class="movie-actors">Matthew McConaughey, Anne Hathaway, Jessica Chastain</p>
            </div>
          </div> */}
        
        </div>
      </div>
  </div>


</>
  )
}

export default MovieCard