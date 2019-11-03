/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { directive } from '@babel/types';
import { withAuth } from '../../Context/AuthContext';
import User from './components/User';
import ChatUserService from '../../services/chatUserService';
import ChatsUser from './components/ChatsUser';
import RoomService from '../../services/roomService';
import RoomsUser from './components/RoomsUser';

class MeUser extends Component {
  state = {
    chats: [],
    rooms: [],
    loading: true,
  };

  handleChatUser = user => {
    ChatUserService.getAllChatUserId(user._id)
      .then(chats => {
        this.setState({
          chats,
        });
      })
      .catch(error => console.log(error));
  };

  handleRoomsUser = user => {
    RoomService.getAllRoomsUserId(user._id)
      .then(rooms => {
        this.setState({
          rooms,
          loading: false,
        });
      })
      .catch(error => console.log(error));
  };

  componentDidMount() {
    const { user } = this.props;
    this.handleChatUser(user);
    this.handleRoomsUser(user);
    console.log(this.state.rooms);
  }

  render() {
    const { user } = this.props;
    const { chats, rooms, loading } = this.state;
    return (
      <div>
        {!loading && (
          <div>
            <div>
              <RoomsUser user={user} rooms={rooms} />
            </div>
            <h2>ITS ME</h2>
            <div>
              <User user={user} />
            </div>
            <div>
              <ChatsUser user={user} chats={chats} />
            </div>
          </div>
        )}
        {loading && <div>loading...</div>}
      </div>
    );
  }
}
export default withAuth(MeUser);
