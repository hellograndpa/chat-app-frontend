/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';

import Login from './Login';
import Signup from './Signup';

class Home extends Component {
  render() {
    return (
      <>
        <div>
          <Login />
        </div>
        <div>hola esto es la home</div>
        <div>
          <Signup />
        </div>
      </>
    );
  }
}

export default Home;
