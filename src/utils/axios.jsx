import axios from "axios";

const instance = axios.create({
    baseURL : "https://api.themoviedb.org/3/",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMTNiMjQyMzJiMmQxNWFhMjRiMGJhNDcyNDZmZWM4ZCIsIm5iZiI6MTcyNjA2ODE0NS42Mzc4OTMsInN1YiI6IjY2Y2VlOGEzNjY5NGY1MmFlNWUyZjI4ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6Oez7zE_pfb4bcXxun5rNOjMTOm6lJU_CMl1HGtZmdQ'
      }
})

export default instance;