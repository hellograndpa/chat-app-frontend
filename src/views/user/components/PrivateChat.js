import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import ChatUserService from '../../../services/chatUserService';

const socket = socketIOClient('localhost:3001');

class PrivateChat extends Component {
  state = {
    roomId: 0,
    conversation: [],
    loading: true,
  };

  async componentDidMount() {
    const { roomId } = this.props;

    // Look for chat available
    const room = await ChatUserService.getPrivateChat(roomId);

    // Fill the state with initial conversation
    this.setState({
      roomId: room._id,
      conversation: room.conversation,
      loading: false,
    });

    // Listen for changes on the db.

    socket.on(roomId, message => {
      const newConversation = [...this.state.conversation, message];
      this.setState({ conversation: newConversation });
    });
  }

  handleSubmit = async e => {
    e.preventDefault();
    // Get the chat Id
    const { roomId } = this.state;
    const text = e.target.text.value;

    // Update the db with the new comment,
    // This will fire a emit on server, we will catch it with the
    // socket.on above
    await ChatUserService.updateChatUser(roomId, text);

    // Clean the input
    this.input.value = '';
  };

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

export default PrivateChat;
