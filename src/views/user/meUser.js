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
    searchChats: [],
    selectStatus: '',
    rooms: [],
    searchRooms: [],
    selectTheme: '',
  };

  handleChatUser = user => {
    ChatUserService.getAllChatUserId(user._id)
      .then(chats => {
        this.setState({
          chats,
          searchChats: chats,
        });
      })
      .catch(error => console.log(error));
  };

  handleRoomsUser = user => {
    RoomService.getAllRoomsUserId(user._id)
      .then(rooms => {
        this.setState({
          rooms,
          searchRooms: rooms,
          loading: false,
        });
      })
      .catch(error => console.log(error));
  };

  handleChangeSelectRooms = event => {
    this.setState({
      selectTheme: event.target.value,
    });
  };

  handleChangeSelectChats = event => {
    this.setState({
      selectStatus: event.target.value,
    });
  };

  handleSearchRoom = event => {
    const { rooms } = this.state;
    let searchRooms = [];
    if (event !== '') {
      searchRooms = rooms.filter(
        element => element.roomName.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1,
      );
    } else {
      searchRooms = rooms;
    }
    this.setState({
      searchRooms,
    });
  };

  handleSearchChats = event => {
    const { chats } = this.state;
    let searchChats = [];
    if (event !== '') {
      searchChats = chats.filter(
        element => element.userChat02.userName.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1,
      );
    } else {
      searchChats = chats;
    }
    this.setState({
      searchChats,
    });
  };

  handleAcceptChat = () => {
    const { user } = this.props;
    this.handleChatUser(user);
  };

  componentDidMount = () => {
    const { user } = this.props;
    this.handleChatUser(user);
    this.handleRoomsUser(user);
  };

  render() {
    const { user } = this.props;
    const { searchChats, selectStatus, searchRooms, selectTheme, loading } = this.state;

    let themes = [];
    if (searchRooms) {
      themes = [...new Set(searchRooms.map(room => room.theme))];
    }
    const sortedList = themes
      .sort((a, b) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
      })
      .map((room, index) => (
        <option key={index} value={room}>
          {room}
        </option>
      ));

    let rooms = [];
    if (selectTheme !== '') {
      rooms = searchRooms.filter(element => element.theme === selectTheme);
    } else {
      rooms = searchRooms;
    }

    return (
      <div>
        {!loading && (
          <div>
            <div>
              <h1> List User Rooms</h1>
              Search <input defaultValue="" onChange={this.handleSearchRoom} />
              <br />
              Filters
              <select value="" onChange={this.handleChangeSelectRooms}>
                <option>Select theme</option>
                <option value="">All</option>
                {sortedList}
              </select>
              <RoomsUser rooms={rooms} />
            </div>
            <h2>ITS ME</h2>
            <div>
              <User showuser={user} />
            </div>
            <div>
              <h1> List User Chats</h1>
              Search <input defaultValue="" onChange={this.handleSearchChats} />
              <ChatsUser
                searchChats={searchChats}
                selectStatus={selectStatus}
                onSelect={this.handleChangeSelectChats}
                onAccept={this.handleAcceptChat}
              />
            </div>
          </div>
        )}
        {loading && <div>loading...</div>}
      </div>
    );
  }
}
export default withAuth(MeUser);
