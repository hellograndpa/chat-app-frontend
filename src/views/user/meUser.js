/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';

// Context
import { withAuth } from '../../Context/AuthContext';

// Services
import ChatUserService from '../../services/chatUserService';
import RoomService from '../../services/roomService';

// Components
import User from './components/User';
import ChatsUser from './components/ChatsUser';
import UsersFilters from './components/UsersFilters';
import RoomsUser from './components/RoomsUser';
import RoomFilters from '../room/components/RoomFilters';

class MeUser extends Component {
  state = {
    chats: [],
    searchChats: [],
    selectStatus: '',
    rooms: [],
    searchRooms: [],
    selectTheme: '',
    pgUser: true,
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
    const { searchChats, selectStatus, searchRooms, selectTheme, loading, pgUser } = this.state;

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
      <div className="CSSgal">
        <s id="s1"></s>
        <s id="s2"></s>
        <s id="s3"></s>
        {/* nav top */}
        <div className="o-top-nav o-top-nav--rel">
          <a href="#s1" className="o-top-nav__btn || o-btn">
            Prev
          </a>
          <a href="#s2" className="o-top-nav__btn o-top-nav__btn--next || o-btn">
            {user.userName}
          </a>
          <a href="#s3" className="o-top-nav__btn o-top-nav__btn--next || o-btn">
            Next
          </a>
        </div>
        {/* end nav top */}
        {!loading && (
          <>
            <div className="slider">
              <div>
                <RoomFilters
                  pgUser={pgUser}
                  eventSearch={searchRooms}
                  handleSearchRoom={this.handleSearchRoom}
                  handleChangeSelectRooms={this.handleChangeSelectRooms}
                  selectTheme={this.state.selectTheme}
                  radiusInMeters={this.state.radiusInMeters}
                  handleChangeSelectRadiusMeters={this.handleChangeSelectRadiusMeters}
                  sortedList={sortedList}
                />
                <RoomsUser rooms={rooms} />
              </div>
              <div className="">
                <User showuser={{}} />
              </div>
              <div>
                <UsersFilters
                  pgUser={pgUser}
                  eventSearch={searchChats}
                  handleSearchUser={this.handleSearchChats}
                  sortedList={sortedList}
                  selectTheme={this.state.selectTheme}
                  handleChangeSelectUser={this.handleChangeSelectUser}
                  radiusInMeters={this.state.radiusInMeters}
                  handleChang
                />
                <ChatsUser
                  searchChats={searchChats}
                  selectStatus={selectStatus}
                  onSelect={this.handleChangeSelectChats}
                  onAccept={this.handleAcceptChat}
                />
              </div>
            </div>
          </>
        )}
        {loading && <div className="loader">Loading...</div>}
      </div>
    );
  }
}
export default withAuth(MeUser);
