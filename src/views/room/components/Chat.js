/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import Moment from 'react-moment';

// Services
import ChatRoomService from '../../../services/chatRoomService';

// Context
import { withAuth } from '../../../Context/AuthContext';
import { withNotification } from '../../../Context/NotificationCtx';

// Image
import avatarDefault from '../../../images/avatar.svg';
import icons_micro from '../../../images/icons/micro.png';
import icons_send from '../../../images/icons/send.png';

import voicer from '../../../helpers/voicer';

import botUser from '../../../helpers/bot-user';

const socket = socketIOClient(process.env.REACT_APP_SOCKET_URL);

class Chat extends Component {
  state = {
    room: this.props.room,
    checkText: '',
    record: false,
  };

  handleVoicerResult = text => {
    const newState = { ...this.state };
    const newConversation = [...this.state.room.chat.conversation];

    if (!text.toLowerCase().startsWith('escribe')) {
      switch (text.toLowerCase()) {
        case 'thor':
          newConversation.push({ _id: 0, user: botUser, image: '/images/home.jpg' });
          newConversation.push({ _id: 0, user: botUser, text: 'Hablas de thor!?' });
          newState.room.chat.conversation = newConversation;
          this.setState({ newState, record: false });
          break;
        case 'mario':
          newConversation.push({ _id: 0, user: botUser, image: '/images/mario.jpg' });
          newConversation.push({
            _id: 0,
            user: botUser,
            text: 'Joven y con ganas! Mucha suerte, aunque no la necesitarás.',
          });
          newState.room.chat.conversation = newConversation;
          this.setState({ newState, record: false });
          break;
        case 'guillem':
          newConversation.push({ _id: 0, user: botUser, image: '/images/guillem.jpg' });
          newConversation.push({
            _id: 0,
            user: botUser,
            text: 'Cuando sea joven, quiero ser como tú! Buen viaje.',
          });
          newState.room.chat.conversation = newConversation;
          this.setState({ newState, record: false });
          break;
        case 'xavi':
          newConversation.push({ _id: 0, user: botUser, image: '/images/xavi.jpg' });
          newConversation.push({
            _id: 0,
            user: botUser,
            text: 'Con calma, harás lo que quieras. Nos vemos por ahí.',
          });
          newState.room.chat.conversation = newConversation;
          this.setState({ newState, record: false });
          break;
        case 'olga z':
          newConversation.push({ _id: 0, user: botUser, image: '/images/olga z.jpg' });
          newConversation.push({
            _id: 0,
            user: botUser,
            text: 'Muy currado Olga y mucho talento, nos beberemos una a tu salud!',
          });
          newState.room.chat.conversation = newConversation;
          this.setState({ newState, record: false });
          break;
        case 'olga de':
          newConversation.push({ _id: 0, user: botUser, image: '/images/olga d.jpg' });
          newConversation.push({
            _id: 0,
            user: botUser,
            text: 'Olga, acuérdate de nosotros cuando seas directiva. Apunta alto.',
          });
          newState.room.chat.conversation = newConversation;
          this.setState({ newState, record: false });
          break;
        case 'elena':
          newConversation.push({ _id: 0, user: botUser, image: '/images/helena.jpg' });
          newConversation.push({
            _id: 0,
            user: botUser,
            text: 'Paso a paso, no pares de aprender.',
          });
          newState.room.chat.conversation = newConversation;
          this.setState({ newState, record: false });
          break;
        case 'juan vicente':
          newConversation.push({ _id: 0, user: botUser, image: '/images/juan vicente.jpg' });
          newConversation.push({
            _id: 0,
            user: botUser,
            text: 'JuanVi, lo bueno empieza ahora! Eres muy grande.',
          });
          newState.room.chat.conversation = newConversation;
          this.setState({ newState, record: false });
          break;
        case 'marc':
          newConversation.push({ _id: 0, user: botUser, image: '/images/marc.jpg' });
          newConversation.push({
            _id: 0,
            user: botUser,
            text: 'La bala pensante. Eres capaz de todo!',
          });
          newState.room.chat.conversation = newConversation;
          this.setState({ newState, record: false });
          break;
        case 'johan':
          newConversation.push({ _id: 0, user: botUser, image: '/images/johan.jpg' });
          newConversation.push({
            _id: 0,
            user: botUser,
            text: 'Colombiano valiente. Ya has dado un paso, sigue andando sin parar.',
          });
          newState.room.chat.conversation = newConversation;
          this.setState({ newState, record: false });
          break;
        case 'jofre':
          newConversation.push({ _id: 0, user: botUser, image: '/images/jofre.jpg' });
          newConversation.push({
            _id: 0,
            user: botUser,
            text: 'Nuestro GrandPa preferido, ahí queda, quién sabe.... Un abrazo enorme!',
          });
          newState.room.chat.conversation = newConversation;
          this.setState({ newState, record: false });
          break;
        case 'cris':
          newConversation.push({ _id: 0, user: botUser, image: '/images/cris.jpg' });
          newConversation.push({
            _id: 0,
            user: botUser,
            text: 'Como se puede tener tanto estilo y encima programar bien? Bravo!!',
          });
          newState.room.chat.conversation = newConversation;
          this.setState({ newState, record: false });
          break;
        case 'ale':
          newConversation.push({ _id: 0, user: botUser, image: '/images/ale.jpg' });
          newConversation.push({
            _id: 0,
            user: botUser,
            text: 'Eres brillante, cualquiera te querría en su equipo.',
          });
          newState.room.chat.conversation = newConversation;
          this.setState({ newState, record: false });
          break;
        case 'natasha':
          newConversation.push({ _id: 0, user: botUser, image: '/images/tash.jpg' });
          newConversation.push({
            _id: 0,
            user: botUser,
            text: 'Che! Lo conseguiste!!! ahora que?!',
          });
          newState.room.chat.conversation = newConversation;
          this.setState({ newState, record: false });
          break;
        case 'minions':
          newConversation.push({ _id: 0, user: botUser, image: '/images/todos.jpg' });
          newConversation.push({
            _id: 0,
            user: botUser,
            text: 'Minions! Nos hemos atrevido a soñar y lo hemos conseguido. Seguimos soñando? ...',
          });
          newState.room.chat.conversation = newConversation;
          this.setState({ newState, record: false });
          break;
        default:
          this.props.handleSetMessage({ typeMessage: 'error', message: `Sorry, did you mean? ${text}` });
          this.setState({
            record: false,
          });
      }
    } else {
      window.document.getElementById('writter').value = text.replace('escribe ', '');
      window.document.getElementById('writter').focus();
      this.setState({
        record: false,
        checkText: text,
      });
    }
  };

  handleClickMicro = () => {
    voicer(this.handleVoicerResult, this.handleCloseMicro);
    this.setState({
      record: true,
    });
  };

  handleCloseMicro = () => {
    this.setState({
      record: false,
    });
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
    window.document.getElementById('anchor').scrollIntoView();
  }

  handleTextArea = e => {
    const checkText = e.target.value;
    this.setState({
      checkText,
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    // Get the chat Id
    const {
      chat: { _id: chatId },
    } = this.state.room;

    const text = e.target.text.value;

    if (text === '') {
      this.props.handleSetMessage({ typeMessage: 'error', message: "Can't send empty messages" });
      return;
    }

    // Update the db with the new comment,
    // This will fire a emit on server, we will catch it with the
    // socket.on above
    // asyncrosous, without wait
    ChatRoomService.updateChatUser(chatId, text);

    // Clean the input
    this.input.value = '';
    this.setState({
      checkText: '',
      record: false,
    });
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
    const { checkText, record } = this.state;
    return (
      <div className="chatroom">
        <div className="chatwrapper">
          <div className="chat">
            {conversation.map((c, index) => {
              return (
                <div key={index}>
                  {c.user._id === this.props.user._id ? (
                    <div className="box tu" key={index}>
                      <div className="bubble you right">
                        <div className="flex-between margin-header-text">
                          <div className="date left">{`${c.user.userName} ${c.user.lastName}`}</div>
                          <div className="date right">
                            <Moment format="DD/MM/YY hh:mm">{c.created}</Moment>
                          </div>
                        </div>
                        {!c.image && c.text}
                        {c.image && (
                          <div className="o-images ">
                            <div className="o-images__inner">
                              <img className="o-images__img" src={c.image} alt="" />
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="box-avatar">
                        <div className={c.user.active ? 'o-avatar is-active w-100precent' : 'o-avatar w-100precent'}>
                          <div className="o-avatar__inner">
                            <img
                              className="o-avatar__img"
                              src={c.user.avatar !== '' ? c.user.avatar : avatarDefault}
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="box el" key={index}>
                      <div className="box-avatar">
                        <div className={c.user.active ? 'o-avatar is-active w-100precent' : 'o-avatar w-100precent'}>
                          <div className="o-avatar__inner">
                            <img
                              className="o-avatar__img"
                              src={c.user.avatar !== '' ? c.user.avatar : avatarDefault}
                              alt=""
                            />
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
                        {!c.image && c.text}
                        {c.image && (
                          <div className="o-images ">
                            <div className="o-images__inner">
                              <img className="o-images__img" src={c.image} alt="" />
                            </div>
                          </div>
                        )}
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
                      id="writter"
                      type="text"
                      className="input chat-textarea"
                      name="text"
                      ref={userInput => (this.input = userInput)}
                      onChange={this.handleTextArea}
                    />
                  </div>

                  {checkText === '' ? (
                    <div className="box-avatar" onClick={this.handleClickMicro}>
                      <div className="o-avatar w-50precent">
                        <div className={`o-avatar__inner ${record && 'aqua'}`}>
                          <img className="o-avatar__img" src={icons_micro} alt="" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="box-avatar">
                      <div className="o-avatar w-50precent">
                        <button className="o-avatar__inner">
                          <img className="o-avatar__img" src={icons_send} alt="" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withNotification(withAuth(Chat));
