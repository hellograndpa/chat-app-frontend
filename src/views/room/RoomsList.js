import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Services
import socketIOClient from 'socket.io-client';
import RoomService from '../../services/roomService';
// Context
import { withNotification } from '../../Context/NotificationCtx';

// Helpers
import { getCoords, getDistanceFromMe } from '../../helpers/coordinates';
import { emptyValidation } from '../../helpers/Validation';

// Components
import RoomsUser from '../user/components/RoomsUser';
import Map from './components/Map';

// CSS

const socket = socketIOClient('localhost:3001');

class RoomsList extends Component {
  state = {
    rooms: [],
    serchRooms: [],
    radiusInMeters: 50000,
    selectTheme: '',
    eventSearch: '',
    loading: true,
  };

  resultRooms = async newRooms => {
    console.log('TCL: RoomsList -> newRooms', newRooms);
    emptyValidation(newRooms, this.props.handleSetMessage);

    this.setState({
      rooms: newRooms,
      searchRooms: newRooms,
      loading: false,
    });
  };

  handleRoomsArroundMe = (latitude, longitude, radiusInMeters) => {
    RoomService.getAllRooms(latitude, longitude, radiusInMeters)
      .then(async rooms => {
        console.log('TCL: RoomsList -> handleRoomsArroundMe -> rooms', rooms);
        const newRooms = await rooms.map(async room => {
          const location = { latitude: room.location.coordinates[0], longitude: room.location.coordinates[1] };
          room.distanceFromMe = await getDistanceFromMe(location);
          return room;
        });
        return Promise.all(newRooms);
      })
      .then(newRooms => {
        console.log('TCL: RoomsList -> handleRoomsArroundMe -> newRooms', newRooms);
        this.resultRooms(newRooms);
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

  handleChangeSelectRadiusMeters = event => {
    this.setState({
      radiusInMeters: event.target.value,
    });
  };

  componentDidMount = async () => {
    const {
      coords: { latitude, longitude },
    } = await getCoords();

    console.log('TCL: RoomsList -> componentDidMount -> latitude', latitude);
    const { radiusInMeters } = this.state;

    this.handleRoomsArroundMe(latitude, longitude, radiusInMeters / 1000);

    socket.on('room-created', room => {
      const searchRooms = [...this.state.searchRooms, room];
      this.setState({ searchRooms });
    });
  };

  render() {
    const { searchRooms, selectTheme, loading, eventSearch, radiusInMeters } = this.state;

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
    if (selectTheme !== '' && radiusInMeters <= 50001) {
      rooms = searchRooms
        .filter(element => element.theme === selectTheme)
        .filter(element => element.distanceFromMe <= radiusInMeters);
    } else {
      rooms = searchRooms;
      console.log('TCL: RoomsList -> render -> searchRooms', searchRooms);
    }

    return (
      <div className="CSSgal">
        {/* Don't wrap targets in parent */}
        <s id="s1"></s>
        <s id="s2"></s>
        <s id="s3"></s>

        {!loading && (
          <>
            <div className="slider">
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
                    defaultValue={this.state.radiusInMeters}
                    onChange={this.handleChangeSelectRadiusMeters}
                  >
                    <option value="50000"> 50 km</option>
                    <option value="40000"> 40 km</option>
                    <option value="30000"> 30 km</option>
                    <option value="20000"> 20 km</option>
                    <option value="10000"> 10 km</option>
                    <option value="5000"> 5 km</option>
                    <option value="200"> 2 km</option>
                  </select>
                </div>
                <Link to="">
                  <button> create new room</button>
                </Link>
              </div>
              <div>
                TRES <h1>Rooms List</h1>
                Search <input name="roomslist" value={eventSearch} onChange={this.handleSearchRoom} />
                <RoomsUser rooms={rooms} />
              </div>
            </div>

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
          </>
        )}
        {loading && <div className="loader">Loading...</div>}
      </div>
    );
  }
}

export default withNotification(RoomsList);
