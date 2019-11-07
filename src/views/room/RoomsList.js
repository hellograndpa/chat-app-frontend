import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withNotification } from '../../Context/NotificationCtx';
import RoomService from '../../services/roomService';
import { getCoords, getDistance, getDistanceFromMe } from '../../helpers/coordinates';
import { emptyValidation } from '../../helpers/Validation';
import RoomsUser from '../user/components/RoomsUser';
import Map from './components/Map';

class RoomsList extends Component {
  state = {
    rooms: [],
    serchRooms: [],
    radiusInMeters: 500000000000000000000,
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
        const newRooms = await rooms.map(async room => {
          const location = { latitude: room.location.coordinates[0], longitude: room.location.coordinates[1] };
          room.distanceFromMe = await getDistanceFromMe(location);
          return room;
        });
        return Promise.all(newRooms);
      })
      .then(newRooms => {
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

  handleChangeSelectRadiusMeters = async event => {
    const radiusInMeters = event.target.value;
    this.setState({
      radiusInMeters,
    });
    const {
      coords: { latitude, longitude },
    } = await getCoords();

    this.handleRoomsArroundMe(latitude, longitude, radiusInMeters);
  };

  componentDidMount = async () => {
    const {
      coords: { latitude, longitude },
    } = await getCoords();
    const { radiusInMeters } = this.state;

    this.handleRoomsArroundMe(latitude, longitude, radiusInMeters / 1000);
  };

  render() {
    console.log(this.props);
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
                  defaultValue={this.state.radiusInMeters}
                  onChange={this.handleChangeSelectRadiusMeters}
                >
                  <option value="50000"> 50 km</option>
                  <option value="40000"> 40 km</option>
                  <option value="30000"> 30 km</option>
                  <option value="20000"> 20 km</option>
                  <option value="10000"> 10 km</option>
                  <option value="5000"> 5 km</option>
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
