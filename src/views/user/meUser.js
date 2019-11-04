/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';

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
    filterRooms: [],
    selectTheme: '',
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
          filterRooms: rooms,
          loading: false,
        });
      })
      .catch(error => console.log(error));
  };

  handleChangeSelect = event => {
    this.setState({
      selectTheme: event.target.value,
    });
  };

  handleSearchRoom = event => {
    const { rooms } = this.state;
    let filterRooms = [];
    if (event !== '') {
      filterRooms = rooms.filter(
        element => element.roomName.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1,
      );
    } else {
      filterRooms = rooms;
    }
    this.setState({
      filterRooms,
    });
  };

  componentDidMount = () => {
    const { user } = this.props;
    this.handleChatUser(user);
    this.handleRoomsUser(user);
  };

  render() {
    const { user } = this.props;
    const { chats, filterRooms, selectTheme, loading } = this.state;
    const sortedList = filterRooms
      .sort((a, b) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
      })
      .map((room, index) => (
        <option key={index} value={room.theme}>
          {room.theme}
        </option>
      ));
    let roomsSelected = [];
    if (selectTheme !== '') {
      roomsSelected = filterRooms.filter(element => element.theme === selectTheme);
    } else {
      roomsSelected = filterRooms;
    }
    return (
      <div>
        {!loading && (
          <div>
            <div>
              <select value="" onChange={this.handleChangeSelect}>
                <option>Select theme</option>
                {sortedList}
              </select>
            </div>
            <div>
              Search <input defaultValue="" onChange={this.handleSearchRoom} />
              <RoomsUser rooms={roomsSelected} />
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
