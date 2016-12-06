import axios from 'axios';
const API_URL = 'http://localhost:3000';

import { browserHistory } from 'react-router';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER } from './types';

export function signinUser({ email, password }) {
  // use redux-thunk
  return function(dispatch){
    // make any kind of requests; asynchonous, etc

    // send email and password to server to authenticate
    // {email: email, password: password} --> {email, password} by ES6
    axios.post(`${API_URL}/signin`, {email,password})
      .then(response => {
        // change state to true if user is authenticated
        dispatch({ type: AUTH_USER });

        // save token
        localStorage.setItem('token', response.data.token);

        // redirect to theme page
        // push onto the stack
        browserHistory.push('/theme');
      })
      .catch(() => {
        dispatch(authError('Wrong Credentials'));
      });
  }
}

export function signOutUser(){
  localStorage.removeItem('token');
  return {
    type: UNAUTH_USER
  };
}

export function authError(error){
  return {
    type: AUTH_ERROR,
    payload: error
  };
}
