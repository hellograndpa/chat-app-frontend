import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import Moment from 'react-moment';

// Services
import ChatUserService from '../../../services/chatUserService';

// Context
import { withAuth } from '../../../Context/AuthContext';

const socket = socketIOClient(process.env.REACT_APP_SOCKET_URL);

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
      <div className="chatroom">
        <div className="chatwrapper">
          <div className="chat">
            {!loading &&
              conversation.map((c, index) => {
                return (
                  <div key={`${c._id}${index}`}>
                    {c.user._id === this.props.user._id ? (
                      <div className="box tu">
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
                      <div className="box el">
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
                  </div>
                );
              })}
            <div id="anchor" className="anchor"></div>
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
                    <button className="o-btn btn-send">Send</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(PrivateChat);
