import { useEffect, useState } from "react";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import requests from "../requests";
import "./Banner.css";
import axios from "../axios";

const baseUrl = "https://image.tmdb.org/t/p/original";

function Banner() {
  
  const [movie, setMovie] = useState({});
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
     const request = await axios.get(requests.fetchTrending);
      const randomMovie = request?.data.results[
        Math.floor(Math.random() * request.data.results.length)
      ];
      setMovie(randomMovie);

      movieTrailer(
        randomMovie?.title || randomMovie?.name || randomMovie?.original_name
      )
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
      
      return request;
      }
    fetchData();
  }, []);

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.title || movie?.name || movie?.original_name)
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
};
  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
      mute: 1,
      controls: 0,
      loop: 1,
      playlist: trailerUrl,
    }
   
  };

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundImage: trailerUrl
          ? "none"
          : `url("${baseUrl}${movie?.backdrop_path}")`,
        
      }}
    >
      {trailerUrl && (
        <YouTube
          style={{}}
          videoId={trailerUrl}
          opts={opts}
          className="banner__video"
        />
      )}
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button onClick={() => handleClick(movie)} className="banner__button">
              {trailerUrl ? "Pause" : "Play"}
          </button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>
      <div className="banner__fadeBottom" />
    </header>
  );
}

export default Banner;
