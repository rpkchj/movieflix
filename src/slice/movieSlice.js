import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    movies:[],   
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
        }
    }
})

export const {storeMovies, storeNewerMovies, storeOlderMovies} = movieSlice.actions

export default movieSlice.reducer