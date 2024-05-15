export async function getMovies(movieYear = 2012){
    try {
        let response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=2dca580c2a14b55200e784d157207b4d&sort_by=popularity.desc&primary_release_year=${movieYear}&page=1&vote_count.gte=100&append_to_response=credits`)
    
        return await response.json()
    } catch (error) {
        throw new Error(error?.message)
    }
}


export async function getGenre(){
    try {
        let response = await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=2dca580c2a14b55200e784d157207b4d")
    
        return await response.json()
    } catch (error) {
        throw new Error(error?.message)
    }
}

export async function filterByGenreID(queryString){
    try {
        let response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=2dca580c2a14b55200e784d157207b4d&with_genres=${queryString}`)
    
        return await response.json()
    } catch (error) {
        throw new Error(error?.message)
    }
}
