import React, { useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import MovieForm from "./Movies/MovieForm";
import UpdateMovie from './Movies/UpdateMovie'
import axios from "axios";

const App = () => {

  const [savedList, setSavedList] = useState([]);

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovies(res.data))
      .catch(err => console.log(err.response));
  }, [])

  const updateMovies = (updatedMovie) => {
  const newMovies = movies.map(movie => {
    if (movie.id === updatedMovie.id) return updatedMovie;
    else return movie
  })
  setMovies(newMovies);
}

const deleteMovie = id => {
  axios.delete(`http://localhost:5000/api/movies/${id}`)
  .then(res => {
    setMovies(movies.filter(movie => movie.id !== res.data));
    })
    .catch(err => console.log(err))
}

  const addToSavedList = movie => {

    setSavedList([...savedList, movie]);
    savedList.push(movie)
    setSavedList({savedList})
  };

  return (
    <>
      <SavedList list={savedList} />

      <Link to="/add">Add New Movie</Link>

        <Route
            exact path="/"
            render={props => <MovieList {...props} movies={movies} />}
            />

        <Route path="/add" component={MovieForm} />

        <Route
            path="/update-movie/:id"
            render= {props => <UpdateMovie {...props} savedList={savedList} updateSavedList={setSavedList}/>}
          />

              <Route
                path="/movies/:id"
                render={props => {

                  return <Movie {...props} addToSavedList={addToSavedList} updateSavedList={setSavedList}/>;
        }}
      />

    </>
  );
};

export default App;
