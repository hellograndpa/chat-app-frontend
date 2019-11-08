/* eslint-disable react/prop-types */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

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
      <div>
        {!loading && (
          <>
            <UsersInChat roomId={this.state.room._id} activeUsers={this.state.room.activeUsers}></UsersInChat>
            <Chat {...this.state}></Chat>
            <RoomDetails {...this.state.room}></RoomDetails>
          </>
        )}
      </div>
    );
  }
}

export default withRouter(RoomWp);
