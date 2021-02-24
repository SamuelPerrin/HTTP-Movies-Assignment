import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialFormValues = {
  title: '',
  director: '',
  metascore: '',
  stars: [],
}

const UpdateForm = props => {
  const { id } = useParams();
  const [formValues, setFormValues] = useState({...initialFormValues, id: id});
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        console.log("GET:", res);
        setFormValues(res.data);
      })
      .catch(err => console.log('error in GET', {err}));
  }, [])

  const handleChange = e => {
    if (e.target.name === 'stars') {
      setFormValues({...formValues, stars: e.target.value.split(',')})
    } else {
      setFormValues({...formValues, [e.target.name]:e.target.value})
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, formValues)
      .then(res => {
        console.log('PUT:', res);
        setFormValues(initialFormValues);
        history.push(`/movies/${id}`);
        axios
          .get('http://localhost:5000/api/movies')
          .then(res => {
            props.setMovieList(res.data);
          })
          .catch(err => console.log('error in 2nd GET:', {err}))
      })
      .catch(err => console.log('error in PUT', {err}, 'used this data', formValues))
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name='title'
          type='text'
          value={formValues.title}
          placeholder='Title'
          onChange={handleChange}
        />
        <input
          name='director'
          type='text'
          value={formValues.director}
          placeholder='Director'
          onChange={handleChange}
        />
        <input
          name='metascore'
          type='text'
          value={formValues.metascore}
          placeholder='Metascore'
          onChange={handleChange}
        />
        <input
          name='stars'
          type='text'
          value={formValues.stars.join`,`}
          placeholder='Title'
          onChange={handleChange}
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default UpdateForm
