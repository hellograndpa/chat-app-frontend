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
    console.log('chatId', room);
    this.setState({ conversation: room.conversation, loading: false, chatId: room.chat });

    // const socket = socketIOClient(this.state.endpoint);
    // socket.on(room.chat, chat => {
    //   const newConversation = [...this.state.conversation, chat];
    //   this.setState({ conversation: newConversation });
    // });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { chatId } = this.state;
    const text = e.target.text.value;

    ChatRoomService.updateChatUser(chatId, text);

    // const socket = socketIOClient(this.state.endpoint);
    // socket.emit(chatId, this.state.text); // change 'red' to this.state.color
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
