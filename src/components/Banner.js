import React, { useEffect, useState } from "react";
import axios from "../axious.js";
import { requests } from "../requests";
import "./banner.css"
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const Banner = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchdata() {
      const request = await axios.get(requests.fetchActionMovies);
      setMovies(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchdata();
  }, []);
  // console.log(movies)
  function truncate(str,n){
      return str?.length>n ? str.substr(0,n-1)+" ...":str;
  }

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


  return(
  <>
   <header className="banner" style={{
   backgroundSize: "cover",
   backgroundImage: `url("https://image.tmdb.org/t/p/original/${movies?.backdrop_path}")`,
   backgroundPosition: "center center",
   }}>
           <div className="banner-content">
               <h1 className="banner-title"> {movies?.title|| movies?.name|| movies?.original_name}</h1>
               <div className="button">
                   <button onClick={()=>handleClick(movies)} className="banner-button">Play</button>
                   <button className="banner-button">My List</button>
               </div>
               <h1 className="banner-desc">
                   {truncate( movies?.overview,150)}
               </h1>
           </div>
   <div className="fade-bottom"></div>
   </header>;
   {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
   </>
   )
};

export default Banner;
