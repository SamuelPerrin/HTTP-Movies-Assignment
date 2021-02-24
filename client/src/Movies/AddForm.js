import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const initialValues = {
  id:'',
  title:'',
  director:'',
  metascore:'',
  stars:[],
}

const AddForm = props => {
  const [formValues, setFormValues] = useState(initialValues);
  const history = useHistory();

  const handleChange = e => {
    if (e.target.name === 'stars') {
      setFormValues({...formValues, stars: e.target.value.split(',')})
    } else {
      setFormValues({...formValues, [e.target.name]:e.target.value})
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/api/movies', formValues)
      .then(res => {
        console.log('POST:', res);
        props.setMovieList(res.data);
        setFormValues(initialValues);
        history.push('/');
      })
      .catch(err => console.log("POST error", {err}))
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='title'
          placeholder='Title'
          value={formValues.title}
          onChange={handleChange}
        />
        <input
          type='text'
          name='director'
          placeholder='Director'
          value={formValues.director}
          onChange={handleChange}
        />
        <input
          type='number'
          name='metascore'
          placeholder='Metascore'
          value={formValues.metascore}
          onChange={handleChange}
        />
        <input
          type='text'
          name='stars'
          placeholder='Stars'
          value={formValues.stars.join`,`}
          onChange={handleChange}
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default AddForm
