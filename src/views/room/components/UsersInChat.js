/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import { NavLink } from 'react-router-dom';

// Services
import RoomService from '../../../services/roomService';

import avatarDefault from '../../../images/avatar.svg';
import { getCoords, getDistance } from '../../../helpers/coordinates';

const socket = socketIOClient(process.env.REACT_APP_SOCKET_URL);

class UsersInChat extends Component {
  state = {
    activeUsers: this.props.activeUsers,
    myLocation: { coords: { latitude: 0, longitude: 0 } },
  };

  async componentDidMount() {
    const { roomId } = this.props;

    this.setState({ myLocation: await getCoords() });
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
    const { activeUsers, myLocation } = this.state;
    return (
      <>
        {activeUsers.length > 0 && (
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
                  </div>

                  <div className="distance">
                    <div className="oval">
                      {getDistance(
                        { latitude: user1.location.coordinates[0], longitude: user1.location.coordinates[1] },
                        myLocation.coords,
                      )}{' '}
                      km
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </>
    );
  }
}

export default UsersInChat;
