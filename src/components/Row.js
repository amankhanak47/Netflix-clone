// import axios from 'axios';
import React, { useEffect } from "react";
import axios from "../axious.js";
import { useState } from "react";
import "./row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
const baseurl = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchURL ,islargerow}) {
  const [movies, setMovies] = useState([]);
  // const base_url = "https://image.tmdb.org/t/p/original/";
  
  useEffect(() => {
    async function fetchdata() {
      const request = await axios.get(fetchURL);
      setMovies(request.data.results);
      return request;
    }
    fetchdata();
  }, [fetchURL]);
  
  const [trailerUrl,setTrailerUrl]=useState("");
  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.title|| movie?.name|| movie?.original_name||movie?.source||'')
      .then((url)=>{
        const urlParams=new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get("v"))
        // console.log(trailerUrl)
      })
      .catch((error)=>console.log(error))
    }
  }

 const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoPlay: 1,
    },
  };



  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="movie-imgs">
        {movies.map((movie) => (
          <img
          key={movie.id}
          onClick={()=>handleClick(movie)}
            className={`row-posters ${islargerow && "row-poster-large"}`}
            src={`${baseurl}${
                islargerow?movie.poster_path:movie.backdrop_path}`}
            alt={movie.name}
          />
        ))}
      </div>
     {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
    </div>
  );
}

export default Row;
