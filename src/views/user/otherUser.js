/* eslint-disable react/prop-types */
import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';
import { withAuth } from '../../Context/AuthContext';

import UserService from '../../services/userService';
import User from './components/User';

class otherUser extends Component {
  state = { showuser: {} };

  async componentDidMount() {
    const {
      match: {
        params: { id: userId },
      },
    } = this.props;

    const showuser = await UserService.getUserById(userId);
    this.setState({ showuser });
  }

  render() {
    const { showuser } = this.state;
    const { user } = this.props;
    return (
      <div>
        <User user={user} showuser={showuser} />
      </div>
    );
  }
}

export default withRouter(withAuth(otherUser));
