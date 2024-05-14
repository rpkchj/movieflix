import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "./slice/movieSlice";


const reducer ={
    movieSlice: movieSlice
}

const store = configureStore({
    reducer,
    devTools: true
})

export default store