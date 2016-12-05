import axios from 'axios';
const API_URL = 'http://localhost:3000';

export function signinUser({ email, password }) {
  // use redux-thunk
  return function(dispatch){
    // make any kind of requests; asynchonous, etc

    // send email and password to server to authenticate
    // {email: email, password: password} --> {email, password} by ES6
    axios.post(`${API_URL}/signin`, {email,password});
  }
}
