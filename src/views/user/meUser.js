/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import { getCoords, getDistance } from '../../helpers/coordinates';

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

const socket = socketIOClient(process.env.REACT_APP_SOCKET_URL);

class MeUser extends Component {
  state = {
    chats: [],
    searchChats: [],
    selectStatus: '',
    rooms: [],
    searchRooms: [],
    selectTheme: '',
    radiusInMeters: 80,
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
      .then(async rooms => {
        const myLocation = await getCoords();
        const newRooms = rooms.map(room => {
          const location = { latitude: room.location.coordinates[0], longitude: room.location.coordinates[1] };
          room.distanceFromMe = getDistance(myLocation.coords, location);
          return room;
        });

        this.setState({
          rooms: newRooms,
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

  handleChangeSelectRadiusMeters = event => {
    this.setState({
      radiusInMeters: event.target.value,
    })
  }

  componentDidMount = () => {
    const { user } = this.props;
    this.handleChatUser(user);
    this.handleRoomsUser(user);

    socket.on('room-created', async room => {
      const myLocation = await getCoords();
      const location = { latitude: room.location.coordinates[0], longitude: room.location.coordinates[1] };
      room.distanceFromMe = getDistance(myLocation.coords, location);
      const searchRooms = [room, ...this.state.rooms];
      this.setState({ searchRooms });
    });
  };

  render() {
    const { user } = this.props;
    const { searchChats, selectStatus, searchRooms, selectTheme, loading, pgUser,radiusInMeters } = this.state;

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
    if (selectTheme !== '' || radiusInMeters <= 50) {
      if (!loading) {
        rooms = searchRooms;

        if (selectTheme !== '') {
          rooms = rooms.filter(element => element.theme === selectTheme);
        }
        if (radiusInMeters <= 51) {
          rooms = rooms.filter(element => element.distanceFromMe <= radiusInMeters);
        }
      }
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
            Me
          </a>
          <a href="#s2" className="o-top-nav__btn o-top-nav__btn--next || o-btn">
            My Rooms
          </a>
          <a href="#s3" className="o-top-nav__btn o-top-nav__btn--next || o-btn">
            My Friends
          </a>
        </div>
        {/* end nav top */}
        {!loading && (
          <>
            <div className="slider">
              <div>
                <User showuser={{}} />
              </div>
              <div className="">
                <RoomFilters
                  pgUser={pgUser}
                  handleSearchRoom={this.handleSearchRoom}
                  handleChangeSelectRooms={this.handleChangeSelectRooms}
                  selectTheme={this.state.selectTheme}
                  radiusInMeters={radiusInMeters}
                  handleChangeSelectRadiusMeters={this.handleChangeSelectRadiusMeters}
                  sortedList={sortedList}
                />
                <RoomsUser rooms={rooms} />
              </div>
              <div>
                <UsersFilters
                  pgUser={pgUser}
                  handleSearchUser={this.handleSearchChats}
                  sortedList={sortedList}
                  selectTheme={this.state.selectTheme}
                  handleChangeSelectUser={this.handleChangeSelectUser}
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
