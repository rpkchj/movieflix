import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    movies:[],   
}

const movieSlice = createSlice({
    name: "movieSlice",
    initialState,
    reducers:{}
})

// export const {} = movieSlice.actions

export default movieSlice.reducer