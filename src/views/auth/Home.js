/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';

import Login from './Login';
import Signup from './Signup';

class Home extends Component {
  componentDidMount() {}

  render() {
    return (
      <div className="CSSgal">
        <s id="s1"></s>
        <s id="s2"></s>
        <s id="s3"></s>

        {/* nav top */}
        <div className="o-top-nav o-top-nav--rel">
          <a href="#s1" className="o-top-nav__btn || o-btn">
            HOME
          </a>
          <a href="#s2" className="o-top-nav__btn o-top-nav__btn--next || o-btn">
            LOGIN
          </a>
          <a href="#s3" className="o-top-nav__btn o-top-nav__btn--next || o-btn">
            SIGNUP
          </a>
        </div>
        {/* end nav top */}
        <div className="slider">
          <div className="login-wrapper">
            <h2>Ready to talk?</h2>
          </div>
          <div>
            <Login />
          </div>
          <div>
            <Signup />
          </div>
        </div>
      </div>
    );
  }
}
export default Home;
