/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';

// Services
import ChatRoomService from '../../../services/chatRoomService';

// Css
import '../../../index.css';

const socket = socketIOClient('localhost:3001');

class Chat extends Component {
  state = {
    room: this.props.room,
  };

  async componentDidMount() {
    const {
      chat: { _id: chatId },
    } = this.state.room;

    // Listen for changes on the db.
    socket.on(chatId, message => {
      const newConversation = [...this.state.room.chat.conversation, message];
      this.setState({ room: { chat: { conversation: newConversation } } });
    });
  }

  handleSubmit = async e => {
    e.preventDefault();
    // Get the chat Id
    const {
      chat: { _id: chatId },
    } = this.state.room;

    const text = e.target.text.value;

    // Update the db with the new comment,
    // This will fire a emit on server, we will catch it with the
    // socket.on above
    // asyncrosous, without wait
    ChatRoomService.updateChatUser(chatId, text);

    // Clean the input
    this.input.value = '';
  };

  async componentCleanup() {
    const {
      chat: { _id: chatId },
    } = this.state.room;
    socket.removeAllListeners(`chat${chatId}`);
  }

  componentWillUnmount() {
    this.componentCleanup();
  }

  render() {
    const {
      chat: { conversation },
    } = this.state.room;

    return (
      <>
        <div className="chatwrapper">
          <div className="chat">
            {conversation.map((c, index) => {
              return (
                <div key={index}>
                  {c.user.userName}: {c.text}
                </div>
              );
            })}
            <div className="anchor"></div>
          </div>
        </div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <input type="text" name="text" ref={userInput => (this.input = userInput)} />
            <button>Enviar</button>
          </form>
        </div>
      </>
    );
  }
}

export default Chat;
