import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signout extends Component{
  componentWillMount(){
    this.props.signOutUser();
  }

  render() {
    return (
      <div>See you next time!</div>
    );
  }
}

export default connect(null, actions)(Signout);
