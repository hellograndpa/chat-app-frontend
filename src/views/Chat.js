import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';

class Chat extends Component {
  state = {
    conversation: [],
    endpoint: 'localhost:3001',
    text: '',
  };

  handleChange = e => {
    const newText = e.target.value;
    this.setState({ text: newText });
  };

  send = () => {
    const socket = socketIOClient(this.state.endpoint);
    socket.emit('chat', this.state.text); // change 'red' to this.state.color
  };

  componentDidMount = () => {
    const socket = socketIOClient(this.state.endpoint);

    socket.on('chat', chat => {
      const newConversation = [...this.state.conversation, chat];
      this.setState({ conversation: newConversation });
    });
  };

  render() {
    const { conversation } = this.state;
    return (
      <div>
        <ul>
          {conversation.map((e, index) => {
            return <li key={index}>{e}</li>;
          })}
        </ul>
        <div>
          <input type="text" onChange={this.handleChange}></input>
          <button onClick={this.send}>Enviar</button>
        </div>
      </div>
    );
  }
}

export default Chat;
