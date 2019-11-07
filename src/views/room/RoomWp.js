/* eslint-disable react/prop-types */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Chat from './components/Chat';
import UsersInChat from './components/UsersInChat';

class RoomWp extends Component {
  render() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    return (
      <div>
        <UsersInChat roomId={id}></UsersInChat>
        <Chat roomId={id}></Chat>
      </div>
    );
  }
}

export default withRouter(RoomWp);
