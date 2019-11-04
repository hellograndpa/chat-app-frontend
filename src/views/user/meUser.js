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
    loading: true,
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

  componentDidMount = () => {
    const { user } = this.props;
    this.handleChatUser(user);
    this.handleRoomsUser(user);
  };

  render() {
    const { user } = this.props;
    const { searchChats, selectStatus, searchRooms, selectTheme, loading } = this.state;
    console.log('TCL: MeUser -> render -> searchChats', searchChats);

    return (
      <div>
        {!loading && (
          <div>
            <div>
              <h1> List User Rooms</h1>
              Search <input defaultValue="" onChange={this.handleSearchRoom} />
              <RoomsUser searchRooms={searchRooms} selectTheme={selectTheme} onSelect={this.handleChangeSelectRooms} />
            </div>
            <h2>ITS ME</h2>
            <div>
              <User user={user} />
            </div>
            <div>
              <h1> List User Chats</h1>
              Search <input defaultValue="" onChange={this.handleSearchChats} />
              <ChatsUser
                searchChats={searchChats}
                selectStatus={selectStatus}
                onSelect={this.handleChangeSelectChats}
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
