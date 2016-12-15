import React, { Component } from 'react';
import axios from 'axios';
import * as actions from '../actions';
import { connect } from 'react-redux';

const API_URL = 'http://localhost:3000';
var template;

class Export extends Component {

  constructor(props) {
    super(props);
    this.export = this.export.bind(this);
  }

  export(){
    axios.get(`${API_URL}/export`)
      .then(response => {
        console.log(response);
      })
      .catch(function (error){
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        {this.export()}
      </div>
    );
  }
}

export default Export;
