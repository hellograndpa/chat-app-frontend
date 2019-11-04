/* eslint-disable react/prop-types */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import Chat from './components/Chat';
import RoomService from '../../services/roomService';
import ChatRoomService from '../../services/chatRoomService';

class RoomWp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversation: [],
      loading: true,
      chatId: 0,
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;

    const room = await RoomService.getRoomById(id);

    this.setState({ conversation: room.chat.conversation, loading: false, chatId: room.chat._id });

    const socket = socketIOClient('localhost:3001');
    socket.on(room.chat._id, message => {
      console.log('medssage', message);
      const newConversation = message.chatUser.conversation;
      this.setState({ conversation: newConversation });
    });
  }

  handleSubmit = async e => {
    e.preventDefault();
    const { chatId } = this.state;
    const text = e.target.text.value;

    const chatUser = await ChatRoomService.updateChatUser(chatId, text);

    const socket = socketIOClient('localhost:3001');
    const message = { chatId, chatUser };
    socket.emit('chat-message', message);
  };

  render() {
    return (
      <div>
        <Chat {...this.state}></Chat>
        <div>
          <form onSubmit={this.handleSubmit}>
            <input type="text" name="text"></input>
            <button>Enviar</button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(RoomWp);
