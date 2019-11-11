import React, { useState, useEffect } from "react"
import axios from 'axios'

function MovieForm(props) {
  const [movie, setMovie] = useState({
      id: '',
      title: '',
      director: '',
      metascore: '',
      stars: ['','',''],
	})

	useEffect(() => {
    axios
    .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
			.then((result) => {
				setMovie(result.data)
			})
			.catch((error) => {
				console.log(error)
			})
		// we're subscribing to the param, just in case it ever changes
		// so it'll re-fetch with the new ID
	}, [props.match.params.id])

	const handleChange = (event) => {
		setMovie({
			...movie,
			[event.target.name]: event.target.value,
		})
	}



	const handleSubmit = (event) => {
		event.preventDefault()

		axios
			.put(`http://localhost:5000/api/movies/${movie.id}`, movie)
			.then((result) => {
				props.setMovie(result.data)
				props.history.push("/movie")
        console.log(movie);
			})

			.catch((error) => {
				console.log(error)
			})
      console.log(movie);
	}

	return (
		<>
			<h1>add a film</h1>

        <form onSubmit={handleSubmit}>
  				<input
  					type="text"
  					name="title"
  					placeholder="Film's Title"
  					value={movie.title}
  					onChange={handleChange}
  				/>
  				<input
  					type="text"
  					name="director"
  					placeholder="Filmss Director"
  					value={movie.director}
  					onChange={handleChange}
  				/>
          <input
            type="number"
            name="metascore"
            placeholder="Film's Metascore"
            value={movie.metascore}
            onChange={handleChange}
          />

        <button type="submit">Add a Film</button>
  			</form>
		</>
	)
}

export default MovieForm
