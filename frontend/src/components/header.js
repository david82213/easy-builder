import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
// import { Link } from 'react-router-link';
import axios from 'axios';

const API_URL = 'http://localhost:3000';

var style={
  color: 'white'
};

class Header extends Component{
  constructor(props) {
    super(props);
    this.export = this.export.bind(this);
  }

  export(){
    // axios.get(`${API_URL}/export`)
    //   .then(response => {
    //     console.log(response);
    //   })
    //   .catch(function (error){
    //     console.log(error);
    //   });

    // window.location.href="http://localhost:3000/export";
  }

  renderLinks(){
    // if user is authenticated
    if (this.props.authenticated) {
      return [
        <li className="nav-item">
          <Link className="nav-link" to="/signout" style={style}>Sign Out</Link>
        </li>,
        <li className="nav-item">
          <a href="http://localhost:3000/export" target="_parent"><button>Export</button></a>
        </li>
      ];
    }
    else{
      return [
        // since its static, fine to assign key as plain integer
        <li className="nav-item" key={1}>
          <Link className="nav-link" to="/signin">Sign In</Link>
        </li>,
        <li className="nav-item" key={2}>
          <Link className="nav-link" to="/signup">Sign Up</Link>
        </li>,
        <li className="nav-item" key={3}>
          <Link className="nav-link" to="http://www.google.ca">
            Google
          </Link>
        </li>
      ];
    }
  }

  render(){
    return (
      <nav className="navbar navbar-light">
        <Link to="/" className="navbar-brand logo" style={style}>Easy Site Builder</Link>
        <ul className="nav navbar-nav">
          {this.renderLinks()}
        </ul>
      </nav>
    );
  }
}

function mapStateToProps(state){
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(Header);
