/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';

import Login from './Login';
import Signup from './Signup';

class Home extends Component {
  componentDidMount() {}

  render() {
    return (
      <div className="CSSgal">
        {/* Don't wrap targets in parent */}
        <s id="s1"></s>
        <s id="s2"></s>
        <s id="s3"></s>

        <div className="slider">
          <div>
            <Login />
          </div>
          <div>
            <div className="home-image">
              <h2>Ready to talk?</h2>
            </div>
          </div>
          <div>
            <Signup />
          </div>
        </div>

        <div className="prevNext">
          <div>
            <a href="#s1"></a>
            <a href="#s2"></a>
          </div>
          <div>
            <a href="#s1"></a>
            <a href="#s3"></a>
          </div>
          <div>
            <a href="#s2"></a>
            <a href="#s3"></a>
          </div>
        </div>
      </div>
    );
  }
}
export default Home;
