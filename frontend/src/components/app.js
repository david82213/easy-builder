import React, { Component } from 'react';
import Header from './header';

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div data-editable data-name="title">
          {this.props.children}
        </div>
      </div>
    );
  }
}
