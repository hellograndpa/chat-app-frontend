/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';

import PrivateChat from './components/PrivateChat';

class PrivateChatWp extends Component {
  render() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    return (
      <div className="CSSgal">
        <s id="s1"></s>
        <s id="s2"></s>
        <s id="s3"></s>
        <div className="o-top-nav o-top-nav--rel">
          <NavLink className="o-top-nav__btn || o-btn" to="/rooms/list">
            Back
          </NavLink>
        </div>

        <div className="slider">
          <div>
            <PrivateChat roomId={id}></PrivateChat>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(PrivateChatWp);
