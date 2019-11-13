/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';

// Services
import Moment from 'react-moment';

import ChatRoomService from '../../../services/chatRoomService';

// Context
import { withAuth } from '../../../Context/AuthContext';

const socket = socketIOClient(process.env.SOCKET_HOST);

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
      const newState = { ...this.state };
      const newConversation = [...this.state.room.chat.conversation, message];
      newState.room.chat.conversation = newConversation;
      this.setState({ newState });
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
    socket.removeAllListeners(chatId);
  }

  componentWillUnmount() {
    this.componentCleanup();
  }

  render() {
    const {
      chat: { conversation },
    } = this.state.room;
    return (
      <div className="chatroom">
        <div className="chatwrapper">
          <div className="chat">
            {conversation.map((c, index) => {
              return (
                <>
                  {c.user._id === this.props.user._id ? (
                    <div className="box tu" key={index}>
                      <div className="bubble you right">
                        <div className="flex-between margin-header-text">
                          <div className="date left">{`${c.user.userName} ${c.user.lastName}`}</div>
                          <div className="date right">
                            <Moment format="DD/MM/YY hh:mm">{c.created}</Moment>
                          </div>
                        </div>
                        {c.text}
                      </div>

                      <div className="box-avatar">
                        <div className={c.user.active ? 'o-avatar is-active w-100precent' : 'o-avatar w-100precent'}>
                          <div className="o-avatar__inner">
                            <img className="o-avatar__img" src={c.user.avatar} alt="" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="box el" key={index}>
                      <div className="box-avatar">
                        <div className={c.user.active ? 'o-avatar is-active w-100precent' : 'o-avatar w-100precent'}>
                          <div className="o-avatar__inner">
                            <img className="o-avatar__img" src={c.user.avatar} alt="" />
                          </div>
                        </div>
                      </div>
                      <div className="bubble me">
                        <div className="flex-between margin-header-text">
                          <div className="date left">
                            <Moment format="DD/MM/YY hh:mm">{c.created}</Moment>
                          </div>
                          <div className="date right">{`${c.user.userName} ${c.user.lastName}`}</div>
                        </div>
                        {c.text}
                      </div>
                    </div>
                  )}
                </>
              );
            })}
            <div className="anchor"></div>
          </div>
        </div>
        <div className="write-text-wrapper">
          <form onSubmit={this.handleSubmit}>
            <div className="form-content">
              <div className="text-area-wp ">
                <textarea
                  type="text"
                  className="input chat-textarea"
                  name="text"
                  ref={userInput => (this.input = userInput)}
                />
              </div>
              <div>
                <button className="o-btn no-border">Enviar</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withAuth(Chat);
