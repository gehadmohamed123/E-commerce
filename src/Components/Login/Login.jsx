import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Joi from 'joi';

export default function Login({ saveUserData }) {
  let navigate = useNavigate();
  const [errorList, setErrorList] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  function getUserData(eventInfo) {
    let myUser = { ...user };
    myUser[eventInfo.target.name] = eventInfo.target.value;
    setUser(myUser);
  }

  async function sendLoginDatatoApi() {
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/signin', user);
      if (data.token) {
        setIsLoading(false);
        localStorage.setItem('userToken', data.token);
        console.log('Token stored:', data.token);
        saveUserData();
        navigate('/home');
      } else {
        setError(data.message);
        setIsLoading(false);
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
      setIsLoading(false);
    }
  }

  function submitLoginForm(e) {
    setIsLoading(true);
    e.preventDefault();
    let validation = validateLoginForm();
    if (validation.error) {
      setIsLoading(false);
      setErrorList(validation.error.details);
    } else {
      sendLoginDatatoApi();
    }
  }

  function validateLoginForm() {
    let scheme = Joi.object({
      email: Joi.string().email({ tlds: { allow: ['com', 'net'] } }).required(),
      password: Joi.string().pattern(/^[1-9]/).required(),
    });
    return scheme.validate(user, { abortEarly: false });
  }

  return (
    <>
      {errorList.map((err, index) => (
        <div key={index} className="alert alert-danger my-2">{err.context.label === 'password' ? 'Password invalid' : err.message}</div>
      ))}
      {error && error.length > 0 && <div className="alert alert-danger my-2">{error}</div>}
      
      <form onSubmit={submitLoginForm}>
        <label htmlFor="email">Email:</label>
        <input
          onChange={getUserData}
          type="email"
          className="form-control my-input m-2"
          name="email"
          id="email"
        />
        <label htmlFor="password">Password:</label>
        <input
          onChange={getUserData}
          type="password"
          className="form-control my-input m-2"
          name="password"
          id="password"
        />
        <button type="submit" className="btn btn-info">
          {isLoading ? <i className='fas fa-spinner fa-spin'></i> : 'Login'}
        </button>
      </form>
    </>
  );
}
