import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    movies:[],  
    genres: {},
    selectedGenres:[]
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
        manipulateSelectedGenres:(state, {payload}) => {
            state.selectedGenres = payload
        }
    }
})

export const {storeMovies, storeNewerMovies, storeOlderMovies, storeGenres, manipulateSelectedGenres} = movieSlice.actions

export default movieSlice.reducer