import React, { Component } from 'react';
import axios from 'axios';
import * as actions from '../actions';
import { connect } from 'react-redux';

const API_URL = 'http://localhost:3000';
var template;
// var template_html;
var Iframe = require("react-iframe");

class Theme extends Component {
  componentWillMount(){
    this.props.fetchMessage();
  }

  constructor(props) {
    super(props);
    // this.getTemplates = this.getTemplates.bind(this);
    this.getOneTemplate = this.getOneTemplate.bind(this);
    this.makeAnotherRequest = this.makeAnotherRequest.bind(this);
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

  makeAnotherRequest(){
    // axios.get(`${API_URL}/blog-client`)
    //   .then(response => {
    //     console.log(response.data['contents2']);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    // $.ajax({
    //     url: 'http://localhost:3000/blog',
    //     type: 'GET',
    //     success: function(res) {
    //         var headline = $(res.data).find('contents2').text();
    //         alert(headline);
    //     }
    // });

    axios.get(`${API_URL}/blog`)
      .then(response => {
        var headline = $(res.data).find('contents2').text();
        alert(headline);
      })
      .catch(function (error){
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        {/* <Iframe url="http://localhost:3000/templates/blog" /> */}
        <Iframe url="http://localhost:3000/blog" />
        {this.makeAnotherRequest()}
        {/* {this.getTemplates()} */}
        {/* {this.getOneTemplate()} */}
        {/* <div id="template-id" contentEditable='true' dangerouslySetInnerHTML={{__html: this.state.template_html}}></div> */}
      </div>
    );
  }
}


function mapStateToProps(state){
  return { message: state.auth.message }
}
// export default Theme;
export default connect(mapStateToProps, actions)(Theme);
