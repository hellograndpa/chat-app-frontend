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

// SCSS

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
        {/* Don't wrap targets in parent */}
        <s id="s1"></s>
        <s id="s2"></s>
        <s id="s3"></s>
        {!loading && (
          <>
            {/* START SLIDER--------- */}
            <div className="slider">
              {/* FIRST SALIDER ------------------*/}
              <div>
                <UsersInChat roomId={this.state.room._id} activeUsers={this.state.room.activeUsers}></UsersInChat>
              </div>
              {/* SECOND SALIDER ------------------*/}
              <div>
                <Chat {...this.state}></Chat>
              </div>
              {/* THIRD SALIDER ------------------*/}
              <div>
                <RoomDetails {...this.state.room}></RoomDetails>
              </div>
            </div>
            {/* END SLIDER--------- */}

            {/* START BUTTONS */}
            <div className="prevNext">
              <div>
                <a href="#s1"></a>
                <a href="#s2"></a>
              </div>
              <div>
                <a href="#s1"></a>
                <a href="#s3"></a>
              </div>
              <div>
                <a href="#s2"></a>
                <a href="#s3"></a>
              </div>
            </div>
            {/* END BUTTONS */}
          </>
        )}
        {loading && <div className="loader">Loading...</div>}
      </div>
    );
  }
}

export default withRouter(RoomWp);
