import React, { useState, useEffect } from 'react';
import './App.css';
import ShowMovie from './ShowMovie'
import searchImage from './search.svg'

// omdb API essentials
// const apiKeyO = '40ee8b6',
// preEndpointO = `http://www.omdbapi.com/?i=tt3896198&apikey=${apiKeyO}`,
// preThumbnailO = 'https://image.tmdb.org/t/p/w500';

const Api_Url = 'http://www.omdbapi.com/?apikey=40ee8b6';

// const movie1 = {
//   "Title": "John Wick: Chapter 3 - Parabellum",
//   "Year": "2019",
//   "imdbID": "tt6146586",
//   "Type": "movie",
//   "Poster": "https://m.media-amazon.com/images/M/MV5BMDg2YzI0ODctYjliMy00NTU0LTkxODYtYTNkNjQwMzVmOTcxXkEyXkFqcGdeQXVyNjg2NjQwMDQ@._V1_SX300.jpg"
// }

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchMovies = async (title) => {
    const response = await fetch(`${Api_Url}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  }

  useEffect(()=> {
     fetchMovies(searchTerm);
  }, [])

  return (
    <div className="App">
      
      <h1>ShowZone</h1>

      <div className='search'>
        <input 
          placeholder='Search a movie' 
          type='text'  
          value={searchTerm}
          onChange={(e)=> setSearchTerm(e.target.value)}/>
          <img 
            alt='search icon'
            src={searchImage} 
            onClick={() => fetchMovies(searchTerm)} />

          </div>

          {
            movies.length > 0 
            ? (
              <div className="container">
                {movies.map((movie) => (
                  <ShowMovie movie={movie} />
                ))}
              </div>
            ) : 
            ( <div className='container'>
                <h2>No Movies Found</h2>
              </div>
            )
          }
            
      </div>
  );
}

export default App;
