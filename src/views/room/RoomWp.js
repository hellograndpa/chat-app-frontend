/* eslint-disable react/prop-types */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Chat from './components/Chat';
import UsersInChat from './components/UsersInChat';

class RoomWp extends Component {
  // async componentDidMount() {
  //   const {
  //     match: {
  //       params: { id },
  //     },
  //   } = this.props;

  //   const room = await RoomService.getRoomById(id);

  //   const newUser = await RoomService.insertUserToRoom(id);

  //   this.setState({
  //     conversation: room.chat.conversation,
  //     loading: false,
  //     chatId: room.chat._id,
  //     // activeUsers: newUser.activeUsers,
  //   });

  //   const socket = socketIOClient('localhost:3001');
  //   socket.on(room.chat._id, message => {
  //     const newConversation = message.chatUser.conversation;
  //     this.setState({ conversation: newConversation });
  //   });
  //   socket.on('user-in-chat', users => {
  //     this.setState({ activeUsers: users });
  //   });

  //   socket.emit('user-in-chat', newUser.activeUsers);
  // }

  // async componentWillUnmount() {
  //   const socket = socketIOClient('localhost:3001');
  //   const {
  //     match: {
  //       params: { id },
  //     },
  //   } = this.props;
  //   const room = await RoomService.deleteUserFromRoom(id);
  //   socket.emit('user-in-chat', room.activeUsers);
  // }

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
