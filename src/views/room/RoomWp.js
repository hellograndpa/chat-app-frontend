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
  };

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;

    const room = await RoomService.getRoomById(id);

    this.setState({ room, loading: false });
  }

  render() {
    const { loading } = this.state;

    return (
      <div className="CSSgal">
        <s id="s1"></s>
        <s id="s2"></s>
        <s id="s3"></s>
        <div className="o-top-nav o-top-nav--rel">
          <NavLink className="o-top-nav__btn || o-btn" to="/rooms/list">
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
