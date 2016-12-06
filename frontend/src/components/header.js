import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends Component{
  render(){
    return (
      <nav className="navbar navbar-light">
        <Link to="/" className="navbar-brand">Easy Site Builder</Link>
        <ul className="nav navbar-nav">
          <li className="nav-item">
            Sign in
          </li>
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

export default connect()(Header);
