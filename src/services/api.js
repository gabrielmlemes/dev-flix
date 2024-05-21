import axios from 'axios'

//  BASE DA URL: https://api.themoviedb.org/3/
// URL DA API /movie/now_playing?api_key=823454608f87c2c263c18e421d4af8d3&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default api