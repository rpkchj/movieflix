import React, { useEffect, useRef, useState } from 'react'
import { getGenre } from '../../services/movieService'
import Button from "../common/Button/Button"
import "./filterheader.css"

const FilterHeader = () => {
  const flag = useRef(false)
  const [genres, setGenres] = useState([])
  const [selectedGenres, setSelectedGenres] = useState([])

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
        const selectGenre =() => {
          if(!selectedGenres.includes(genre.id)){
            setSelectedGenres((prev) => [...prev, genre.id])
          }else{
            let tmp = selectedGenres.filter(genreID => genreID !== genre.id)
            setSelectedGenres(tmp)
          }
        }
        return <Button key={genre.id} title={genre.name} onButtonClick={selectGenre} isSelected={selectedGenres.includes(genre.id)}/>
      })}
    </div>
  )
}

export default FilterHeader