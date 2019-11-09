/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

// Views
import Login from './views/auth/Login';
import Signup from './views/auth/Signup';
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

class App extends Component {
  render() {
    const { handleLogout, user, notification, status, handleCloseMessage } = this.props;
    return (
      <>
        {status && (
          <div className={notification.typeMessage}>
            {notification.typeMessage}: {notification.message}
            <button onClick={handleCloseMessage}>close</button>
          </div>
        )}
        <button onClick={handleLogout}>logout</button>
        <Router>
          <Switch>
            <AnonRoute exact path="/home" component={Home} />
            <AnonRoute exact path="/login" component={Login} />
            <AnonRoute exact path="/signup" component={Signup} />
            <PrivateRoute exact path="/me-user" component={MeUser} />
            <PrivateRoute exact path="/users/list" component={UsersList} />
            <PrivateRoute exact path="/rooms/create" component={CreateRoomWp} />
            <PrivateRoute exact path="/rooms/list" component={RoomsList} />
            <PrivateRoute exact path="/rooms/:id" component={RoomWp} />
            <PrivateRoute exact path="/users/:id" component={OtherUser} />
            <PrivateRoute exact path="/users/private-chat/:id" component={PrivateChatWp} />
          </Switch>
        </Router>
      </>
    );
  }
}

export default withAuth(withNotification(App));
