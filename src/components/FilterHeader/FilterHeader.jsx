import React, { useEffect, useRef, useState } from 'react'
import { getGenre } from '../../services/movieService'
import Button from "../common/Button/Button"
import "./filterheader.css"

const FilterHeader = () => {
  const flag = useRef(false)
  const [genres, setGenres] = useState([])

  const callToGetGenres = () => {
    getGenre().then(genre => {
      console.log("genre", genre.genres)
      setGenres(genre.genres)
    })
  }

  useEffect(() =>{
    if(!flag.current){
      callToGetGenres()
      return () => flag.current = true
    }
  },[])
  return (
    <div className='filter_header'>
      {genres.map(genre => {
        return <Button title={genre.name}/>
      })}
    </div>
  )
}

export default FilterHeader