/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';

import Login from './Login';
import Signup from './Signup';

class Home extends Component {
  componentDidMount() {}

  render() {
    return (
      <div className="CSSgal bg-image-slider">
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
        <div className="slider ">
          <div className="login-wrapper">
            <div className="logo">talk-in.me</div>
            <div className="subtitle">
              share your knowledge <br />
              with the people arround you
            </div>
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
