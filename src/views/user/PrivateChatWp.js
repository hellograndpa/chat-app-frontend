/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import PrivateChat from './components/PrivateChat';

class PrivateChatWp extends Component {
  render() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    return (
      <div>
        <PrivateChat roomId={id}></PrivateChat>
      </div>
    );
  }
}

export default withRouter(PrivateChatWp);
