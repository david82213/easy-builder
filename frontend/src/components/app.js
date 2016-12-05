import React, { Component } from 'react';
import Header from './header';

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div data-editable data-name="title">
          <p>React simple starter</p>
        </div>
      </div>
    );
  }
}
