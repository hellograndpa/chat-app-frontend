/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';

import Login from './Login';
import Signup from './Signup';

class Home extends Component {
  componentDidMount() {
    const script = document.createElement('script');

    script.src = 'js/swipe.js';
    script.async = true;

    document.body.appendChild(script);
  }

  render() {
    return (
      <>
        <div className="container">
          <div className="left">
            <Login />
          </div>
          <div className="center">hola esto es la home</div>
          <div className="right">
            <Signup />
          </div>
        </div>
      </>
    );
  }
}

export default Home;
