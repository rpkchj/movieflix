import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    movies:[],  
    genres: [] 
}

const movieSlice = createSlice({
    name: "movieSlice",
    initialState,
    reducers:{
        storeMovies: (state, {payload}) => {
            state.movies = payload
        },
        storeOlderMovies: (state, {payload}) => {
            state.movies = [...payload, ...state.movies]
        },
        storeNewerMovies: (state, {payload}) => {
            state.movies = [...state.movies, ...payload]
        },
        storeGenres: (state, {payload}) => {
            state.genres = payload
        },
    }
})

export const {storeMovies, storeNewerMovies, storeOlderMovies, storeGenres} = movieSlice.actions

export default movieSlice.reducer