import React from "react";
import { NavLink, Route } from 'react-router-dom'
import axios from "axios";
import MovieCard from "./MovieCard";

export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  deleteMovie = id => {
    axios
    .delete(`http://localhost:5000/api/movies/${id}`)
    .catch(err => {
      console.log(err.response)
  })
  this.props.history.push('/')
  window.location.href = window.location.href
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <button className="save-button" onClick={this.saveMovie}>
          Save
        </button>
        <button
        onClick={() => this.props.history.push(`/update-movie/${this.state.movie.id}`)}
      >
        Update
      </button>

        <button onClick={() => this.deleteMovie(this.state.movie.id)} className="delete-button">
          Delete
        </button>
      </div>
    );
  }
}
