import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

const MovieCard = props => {
  const { title, director, metascore, stars } = props.movie;
  const history = useHistory();
  const params = useParams();

  const handleEdit = () => {
    history.push(`/update-movie/${params.id}`)
  }

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/api/movies/${params.id}`)
      .then(res => {
        history.push('/')
      })
      .catch(err => {
        console.log('DELETE:', {err})
      })
  }

  return (
    <div className="movie-card">
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>

      {stars.map(star => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))}
      {props.isFocus && 
        <div>
          <button onClick={handleEdit}>Edit Details</button>
          <button onClick={handleDelete}>Delete Movie</button>
        </div>
      }
    </div>
  );
};

export default MovieCard;
