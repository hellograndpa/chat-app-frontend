/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import RoomService from '../../../services/roomService';
import ChatRoomService from '../../../services/chatRoomService';
import '../../../index.css';

const socket = socketIOClient('localhost:3001');

class Chat extends Component {
  state = {
    roomId: 0,
    chatId: 0,
    conversation: [],
    loading: true,
  };

  async componentDidMount() {
    // Recevie RoomId from parent
    const { roomId } = this.props;

    // Look for room available
    const room = await RoomService.getRoomById(roomId);

    // Fill the state with initial conversation
    this.setState({
      roomId: room._id,
      chatId: room.chat._id,
      conversation: room.chat.conversation,
      loading: false,
    });

    // Listen for changes on the db.

    socket.on(room.chat._id, message => {
      const newConversation = [...this.state.conversation, message];
      this.setState({ conversation: newConversation });
    });
  }

  handleSubmit = async e => {
    e.preventDefault();
    // Get the chat Id
    const { chatId } = this.state;
    const text = e.target.text.value;

    // Update the db with the new comment,
    // This will fire a emit on server, we will catch it with the
    // socket.on above
    await ChatRoomService.updateChatUser(chatId, text);

    // Clean the input
    this.input.value = '';
  };

  async componentCleanup() {
    const { chatId } = this.state;
    socket.removeAllListeners(`chat${  chatId}`);
  }

  componentWillUnmount() {
    this.componentCleanup();
  }

  render() {
    const { conversation, loading } = this.state;

    return (
      <>
        <div className="chatwrapper">
          <div className="chat">
            {!loading &&
              conversation.map((c, index) => {
                return (
                  <div key={index}>
                    {c.user.userName}: {c.text}
                  </div>
                );
              })}
            {loading && 'loading...'}
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
