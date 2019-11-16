/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Beforeunload } from 'react-beforeunload';
// Views

import socketIOClient from 'socket.io-client';
import Home from './views/auth/Home';
import MeUser from './views/user/meUser';
import OtherUser from './views/user/otherUser';
import CreateRoomWp from './views/room/CreateRoomWp';
import RoomWp from './views/room/RoomWp';
import RoomsList from './views/room/RoomsList';
import PrivateChatWp from './views/user/PrivateChatWp';
import UsersList from './views/user/UsersList';

// Context
import { withAuth } from './Context/AuthContext';
import { withNotification } from './Context/NotificationCtx';

import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';

import Notifications from './views/notifications/Notifications';

const socket = socketIOClient(process.env.REACT_APP_SOCKET_URL);

class App extends Component {
  componentDidMount() {
    if (this.props.user) {
      this.props.handleRemember();
      socket.on(`messageToUser-${this.props.user._id}`, message => {
        this.props.handleSetMessage({ typeMessage: 'info', message: message.text });
      });
    }
  }

  render() {
    const { handleAbandon } = this.props;
    return (
      <>
        <Notifications></Notifications>
        <Beforeunload onBeforeunload={handleAbandon}>
          <Router>
            <Switch>
              <AnonRoute exact path="/" component={Home} />
              <PrivateRoute exact path="/me-user" component={MeUser} />
              <PrivateRoute exact path="/users/list" component={UsersList} />
              <PrivateRoute exact path="/rooms/create" component={CreateRoomWp} />
              <PrivateRoute exact path="/rooms/list" component={RoomsList} />
              <PrivateRoute exact path="/rooms/:id" component={RoomWp} />
              <PrivateRoute exact path="/users/:id" component={OtherUser} />
              <PrivateRoute exact path="/users/private-chat/:id" component={PrivateChatWp} />
            </Switch>
          </Router>
        </Beforeunload>
      </>
    );
  }
}

export default withNotification(withAuth(App));
