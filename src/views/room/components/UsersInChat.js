/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import { NavLink } from 'react-router-dom';

// Services
import RoomService from '../../../services/roomService';

import avatarDefault from '../../../images/avatar.svg';

const socket = socketIOClient(process.env.SOCKET_HOST);

class UsersInChat extends Component {
  state = {
    activeUsers: this.props.activeUsers,
  };

  async componentDidMount() {
    const { roomId } = this.props;

    // First we listen for incoming users
    socket.on(`user-in-chat-${roomId}`, users => {
      this.setState({ activeUsers: users });
    });

    // Insert the user into the room,
    // this will fire socket.on before.
    RoomService.insertUserToRoom(roomId);
  }

  componentCleanup() {
    const { roomId } = this.props;
    socket.removeAllListeners(`user-in-chat${roomId}`);
    RoomService.deleteUserFromRoom(roomId);
  }

  componentWillUnmount() {
    this.componentCleanup();
  }

  render() {
    const { activeUsers } = this.state;
    return (
      <div className="users-list-content-Bg">
        <h3>{activeUsers.length} Users in this chat</h3>
        {activeUsers.map(user1 => {
          return (
            <div key={user1._id} className="users-list-line">
              <div className="o-avatar is-active w-15precent">
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
                <div>Last theme {user1.userName}</div>
              </div>

              <div className="distance">
                <div className="oval">{/* user1.distanceFromMe.toFixed(1) */} km</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default UsersInChat;
