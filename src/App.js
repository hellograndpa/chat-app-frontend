import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import PrivateView from './views/PrivateView';
import Login from './views/auth/Login';
import Signup from './views/auth/Signup';
import Home from './views/auth/Home';
import Chat from './views/Chat';
import MeUser from './views/user/meUser';
import CreateRoomWp from './views/room/CreateRoomWp';
import RoomsList from './views/room/RoomsList';

import { withAuth } from './Context/AuthContext';

import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';

class App extends Component {
  render() {
    const { handleLogout, user } = this.props;
    return (
      <>
        <button onClick={handleLogout}>logout</button>
        <Router>
          <AnonRoute exact path="/chat" component={Chat} />
          <AnonRoute exact path="/home" component={Home} />
          <AnonRoute exact path="/login" component={Login} />
          <AnonRoute exact path="/signup" component={Signup} />
          <PrivateRoute exact path="/me-user" component={MeUser} />
          <PrivateRoute exact path="/rooms/create" component={CreateRoomWp} />
          <PrivateRoute exact path="/rooms/list" component={RoomsList} />
        </Router>
      </>
    );
  }
}

export default withAuth(App);
