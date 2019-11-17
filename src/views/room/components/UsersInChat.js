import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

// Services
import RoomService from '../../../services/roomService';

import avatarDefault from '../../../images/avatar.svg';
import { getCoords, getDistance } from '../../../helpers/coordinates';

class UsersInChat extends Component {
  _isMounted = false;

  socket = socketIOClient(process.env.REACT_APP_SOCKET_URL);

  state = {
    textToSearch: '',
    participatedUsers: this.props.participatedUsers,
    activeUsers: this.props.activeUsers,
    myLocation: { coords: { latitude: 0, longitude: 0 } },
  };

  async componentDidMount() {
    this._isMounted = true;

    const { roomId } = this.props;

    if (this._isMounted) {
      this.setState({ myLocation: await getCoords() });
    }

    // First we listen for incoming users
    this.socket.on(`user-in-chat-${roomId}`, users => {
      const { participatedUsers } = this.state;

      users.forEach(userActive => {
        if (participatedUsers.filter(user => user._id === userActive._id).length === 0) {
          participatedUsers.push(userActive);
        }
      });
      if (this._isMounted) {
        this.setState({ participatedUsers, activeUsers: users });
      }
    });

    // If the user goes to another web or close the browser
    window.onbeforeunload = () => {
      this.componentCleanup();
    };

    // this will fire socket.on before.
    RoomService.insertUserToRoom(roomId);
  }

  componentCleanup() {
    const { roomId } = this.props;
    this._isMounted = false;

    this.socket.removeAllListeners(`user-in-chat${roomId}`);
    RoomService.deleteUserFromRoom(roomId);
  }

  componentWillUnmount() {
    this.componentCleanup();
  }

  handleKeyPress = event => {
    if (this._isMounted) {
      this.setState({ textToSearch: event.target.value.toLowerCase() });
    }
  };

  render() {
    const { participatedUsers, activeUsers, myLocation, textToSearch } = this.state;

    // Search users by name
    let users = participatedUsers.filter(
      element => `${element.userName} ${element.lastName}`.toLowerCase().indexOf(textToSearch) !== -1,
    );

    // Get if isactive in the chat
    users = users.map(user => {
      user.active = activeUsers.filter(userActive => userActive._id === user._id).length > 0;
      return user;
    });

    // Sort users by active / no active
    users.sort((a, b) => (a.active > b.active ? -1 : 1));

    return (
      <div className="users-list-content-Bg">
        <h3>{users.length} Users in this chat</h3>
        <div>
          <input
            type="text"
            className="input-dark top-0"
            placeholder="Search by name..."
            name="searchName"
            onChange={this.handleKeyPress}
          ></input>
        </div>
        {users &&
          users.length > 0 &&
          users.map(user1 => {
            return (
              <div key={user1._id} className="users-list-line">
                <div className={user1.active ? 'o-avatar is-active w-15precent' : 'o-avatar w-15precent'}>
                  <div className="o-avatar__inner">
                    <img
                      className="o-avatar__img"
                      src={user1.avatar !== undefined ? user1.avatar : avatarDefault}
                      alt=""
                    />
                  </div>
                </div>

                <div className="text-user">
                  <NavLink className="name" to={`/users/${user1._id}`}>
                    <strong>
                      {user1.userName} {user1.lastName}
                    </strong>
                  </NavLink>

                  <div>Ciudad {user1.city}</div>
                </div>

                <div className="distance">
                  <div className="oval">
                    {getDistance(
                      { latitude: user1.location.coordinates[0], longitude: user1.location.coordinates[1] },
                      myLocation.coords,
                    ).toFixed(2)}{' '}
                    km
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}

UsersInChat.propTypes = {
  participatedUsers: PropTypes.array,
  activeUsers: PropTypes.array,
  roomId: PropTypes.string,
};

export default UsersInChat;
