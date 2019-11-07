import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import socketIOClient from 'socket.io-client';
import { withNotification } from '../../Context/NotificationCtx';
import RoomService from '../../services/roomService';
import { getCoords } from '../../helpers/coordinates';
import { emptyValidation } from '../../helpers/Validation';
import RoomsUser from '../user/components/RoomsUser';
import Map from './components/Map';

const socket = socketIOClient('localhost:3001');

class RoomsList extends Component {
  state = {
    rooms: [],
    serchRooms: [],
    radiusInMeters: 50,
    selectTheme: '',
    eventSearch: '',
    loading: true,
  };

  handleRoomArroundMe = (latitude, longitude, radiusInMeters) => {
    RoomService.getAllRooms(latitude, longitude, radiusInMeters)
      .then(rooms => {
        emptyValidation(rooms, this.props.handleSetMessage);
        this.setState({
          rooms,
          searchRooms: rooms,
          loading: false,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleSearchRoom = event => {
    const { rooms } = this.state;

    let searchRooms;
    let newEventSearch;
    if (event !== '') {
      searchRooms = rooms.filter(
        element => element.roomName.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1,
      );
      newEventSearch = event.target.value;
    } else {
      searchRooms = rooms;
    }
    this.setState({
      searchRooms,
      eventSearch: newEventSearch,
    });
    emptyValidation(searchRooms, this.props.handleSetMessage);
  };

  handleChangeSelectRooms = event => {
    this.setState({
      selectTheme: event.target.value,
    });
  };

  handleChangeSelectRadiusMeters = async event => {
    const radiusInMeters = event.target.value;
    this.setState({
      radiusInMeters,
    });
    const {
      coords: { latitude, longitude },
    } = await getCoords();

    this.handleRoomArroundMe(latitude, longitude, radiusInMeters);
  };

  componentDidMount = async () => {
    const {
      coords: { latitude, longitude },
    } = await getCoords();
    const { radiusInMeters } = this.state;

    this.handleRoomArroundMe(longitude, latitude, radiusInMeters);

    socket.on('room-created', room => {
      const searchRooms = [...this.state.searchRooms, room];
      this.setState({ searchRooms });
    });
  };

  render() {
    const { searchRooms, selectTheme, loading, eventSearch } = this.state;

    let themes = [];
    if (searchRooms && searchRooms.length > 0) {
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
            aa
            <div>
              <h1>Room map</h1>
              <Map locations={rooms} />
            </div>
            <div>
              <h1>Rooms Filter</h1>
              <div>
                Search: <br />
                <input name="rooms" value={eventSearch} onChange={this.handleSearchRoom} />
                <br />
                Theme: <br />
                <select name="Select theme" value={this.state.selectTheme} onChange={this.handleChangeSelectRooms}>
                  <option value="">All</option>
                  {sortedList}
                </select>
                <br />
                Radius Km: <br />
                <select
                  name="Select kms"
                  Select
                  value={this.state.radiusInMeters}
                  onChange={this.handleChangeSelectRadiusMeters}
                >
                  <option value="50"> 50 km</option>
                  <option value="40"> 40 km</option>
                  <option value="30"> 30 km</option>
                  <option value="20"> 20 km</option>
                  <option value="10"> 10 km</option>
                  <option value="5"> 5 km</option>
                  <option value="2"> 2 km</option>
                </select>
              </div>
              <Link to="">
                <button> create new room</button>
              </Link>
            </div>
            <div>
              <h1>Rooms List</h1>
              Search <input name="roomslist" value={eventSearch} onChange={this.handleSearchRoom} />
              <RoomsUser rooms={rooms} />
            </div>
          </div>
        )}
        {loading && <div>loading...</div>}
      </div>
    );
  }
}

export default withNotification(RoomsList);
