/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import RoomService from '../../../services/roomService';

const socket = socketIOClient('localhost:3001');

class UsersInChat extends Component {
  state = {
    activeUsers: [],
  };

  async componentDidMount() {
    const { roomId } = this.props;

    // First we listen for incoming users
    socket.on('user-in-chat', users => {
      this.setState({ activeUsers: users });
    });

    // Insert the user into the room,
    // this will fire socket.on before.
    await RoomService.insertUserToRoom(roomId);
  }

  async componentCleanup() {
    socket.removeAllListeners('user-in-chat');
    const { roomId } = this.props;
    await RoomService.deleteUserFromRoom(roomId);
  }

  componentWillUnmount() {
    this.componentCleanup();
  }

  render() {
    const { activeUsers } = this.state;
    return (
      <div>
        {activeUsers.map(user => {
          return <li key={user._id}>{user.userName}</li>;
        })}
      </div>
    );
  }
}

export default UsersInChat;
