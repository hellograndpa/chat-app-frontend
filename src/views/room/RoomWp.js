/* eslint-disable react/prop-types */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';

// Services
import RoomService from '../../services/roomService';

// Components
import Chat from './components/Chat';
import UsersInChat from './components/UsersInChat';
import RoomDetails from './components/RoomDetails';

class RoomWp extends Component {
  state = {
    room: {},
    loading: true,
    menu: false,
  };

  _isMounted = false;

  async componentDidMount() {
    this._isMounted = true;
    const {
      match: {
        params: { id },
      },
    } = this.props;

    const room = await RoomService.getRoomById(id);

    if (this._isMounted) {
      this.setState({ room, loading: false });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleChangeMenu = () => {
    this.setState({ menu: !this.state.menu });
  };

  render() {
    const { loading, menu } = this.state;

    return (
      <div className="CSSgal">
        <s id="s1"></s>
        <s id="s2"></s>
        <s id="s3"></s>
        <div className="roomWp">
          <div className="nav-chat-wrapper">
            <div className="chat-title">{this.state.room.roomName}</div>
          </div>
          <div className={menu ? 'chat-navbar expanded' : 'chat-navbar'}>
            <div className="o-top-nav o-top-nav--rel">
              <NavLink className="o-top-nav__btn || o-btn" to="/rooms/">
                Back
              </NavLink>

              <a href="#s1" className="o-top-nav__btn o-top-nav__btn--next || o-btn">
                Chat
              </a>
              <a href="#s2" className="o-top-nav__btn o-top-nav__btn--next || o-btn">
                Users
              </a>
              <a href="#s3" className="o-top-nav__btn o-top-nav__btn--next || o-btn">
                Details
              </a>
            </div>
          </div>
        </div>

        <div onClick={this.handleChangeMenu} className={menu ? 'top-menu-button active' : 'top-menu-button'}>
          <div className="top-menu-icon"></div>
        </div>
        {!loading && (
          <>
            <div className="slider">
              <div>
                <Chat {...this.state}></Chat>
              </div>
              <div>
                <UsersInChat
                  roomId={this.state.room._id}
                  participatedUsers={this.state.room.participatedUsers}
                  activeUsers={this.state.room.activeUsers}
                ></UsersInChat>
              </div>
              <div>
                <RoomDetails {...this.state.room}></RoomDetails>
              </div>
            </div>
          </>
        )}
        {loading && <div className="loader">Loading...</div>}
      </div>
    );
  }
}

export default withRouter(RoomWp);
