import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Joi from 'joi';

export default function Register() {
  let navigate = useNavigate();
  const [errorList, setErrorList] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  function getUserData(eventInfo) {
    let myUser = { ...user };
    myUser[eventInfo.target.name] = eventInfo.target.value;
    setUser(myUser);
  }

  const sendRegisterDataToApi = async () => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/signup', user);
      if (data.message === 'User registered successfully') {
        setIsLoading(false);
        navigate('/login');
      } else {
        setIsLoading(false);
        setError(data.message);
      }
    } catch (err) {
      setIsLoading(false);
      setError('An error occurred. Please try again later.');
    }
  };

  function submitRegisterForm(e) {
    setIsLoading(true);
    e.preventDefault();
    let validation = validateRegisterForm();
    if (validation.error) {
      setIsLoading(false);
      setErrorList(validation.error.details);
    } else {
      sendRegisterDataToApi();
    }
  }

  function validateRegisterForm() {
    let scheme = Joi.object({
      name: Joi.string().min(3).max(20).required(),
      email: Joi.string().email({ tlds: { allow: ['com', 'net'] } }).required(),
      password: Joi.string().pattern(/^[1-9]/),
    });
    return scheme.validate(user, { abortEarly: false });
  }

  return (
    <>
      {errorList.map((err, index) => {
        if (err.context.label === 'password') {
          return <div key={index} className="alert alert-danger my-2">Password invalid</div>;
        } else {
          return <div key={index} className="alert alert-danger my-2">{err.message}</div>;
        }
      })}
      {error && error.length > 0 ? (
        <div className="alert alert-danger my-2">{error}</div>
      ) : null}

      <form onSubmit={submitRegisterForm}>
        <label htmlFor="name">Name:</label>
        <input
          onChange={getUserData}
          type="text"
          className="form-control my-input m-2"
          name="name"
          id="name"
        />
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
          {isLoading ? <i className="fas fa-spinner fa-spin"></i> : 'Register'}
        </button>
      </form>
    </>
  );
}
