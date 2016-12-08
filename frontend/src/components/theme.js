import React, { Component } from 'react';
import axios from 'axios';
import * as actions from '../actions';

const API_URL = 'http://localhost:3000';
var template;
// var template_html;
var Iframe = require("react-iframe");

class Theme extends Component {
  constructor(props) {
    super(props);
    // this.getTemplates = this.getTemplates.bind(this);
    this.getOneTemplate = this.getOneTemplate.bind(this);
    this.state = {
      template_html: null
    }
  }

  // getTemplates(){
  //   axios.get(`${API_URL}/templates`)
  //     .then(response => {
  //       template = response.data[0];
  //       console.log(template);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }

  getOneTemplate(){
    // axios.get(`${API_URL}/templates/${template}`)
    axios.get(`${API_URL}/templates/blog`)
      .then(response => {
        this.setState({
          template_html: response.data.template_body_html
        })
        // console.log(this.state.template_html);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        {/* <Iframe url="http://localhost:3000/templates/blog" /> */}
        {/* {this.getTemplates()} */}
        {this.getOneTemplate()}
        <div dangerouslySetInnerHTML={{__html: this.state.template_html}}></div>
      </div>
    );
  }
}

export default Theme;
