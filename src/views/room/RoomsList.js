import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Services
import socketIOClient from 'socket.io-client';
import RoomService from '../../services/roomService';

// Context
import { withNotification } from '../../Context/NotificationCtx';
import { withAuth } from '../../Context/AuthContext';

// Helpers
import { getCoords, getDistance } from '../../helpers/coordinates';
import { emptyValidation } from '../../helpers/Validation';

// Components
import RoomsUser from '../user/components/RoomsUser';
import Map from './components/Map';
import RoomFilters from './components/RoomFilters';

const socket = socketIOClient(process.env.REACT_APP_SOCKET_URL);

class RoomsList extends Component {
  state = {
    rooms: [],
    serchRooms: [],
    radiusInMeters: 50,
    selectTheme: '',
    eventSearch: '',
    loading: true,
  };

  resultRooms = async newRooms => {
    emptyValidation(newRooms, this.props.handleSetMessage);
    this.setState({
      rooms: newRooms,
      searchRooms: newRooms,
      loading: false,
    });
  };

  handleRoomsArroundMe = async (latitude, longitude, radiusInMeters) => {
    const myLocation = await getCoords();
    RoomService.getAllRooms(latitude, longitude, radiusInMeters)
      .then(rooms => {
        const newRooms = rooms.map(room => {
          const location = { latitude: room.location.coordinates[0], longitude: room.location.coordinates[1] };
          room.distanceFromMe = getDistance(myLocation.coords, location);
          return room;
        });
        return newRooms;
      })
      .then(newRooms => {
        this.resultRooms(newRooms);
      })
      .catch(error => {
        this.props.handleSetMessage({ typeMessage: 'error', message: error });
      });
  };

  handleSearchRoom = event => {
    event.preventDefault();
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
    const { radiusInMeters } = this.state;

    this.handleRoomsArroundMe(latitude, longitude, radiusInMeters);

    socket.on('room-created', async room => {
      const myLocation = await getCoords();
      const location = { latitude: room.location.coordinates[0], longitude: room.location.coordinates[1] };
      room.distanceFromMe = getDistance(myLocation.coords, location);
      const searchRooms = [room, ...this.state.rooms];
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
    if (selectTheme !== '' || radiusInMeters <= 51) {
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
        {/* nav top */}
        <div className="o-top-nav o-top-nav--rel">
          <a href="#s1" className="o-top-nav__btn || o-btn">
            Rooms
          </a>
          <a href="#s2" className="o-top-nav__btn o-top-nav__btn--next || o-btn">
            Map
          </a>
        </div>
        {/* end nav top */}
        {!loading && (
          <>
            <div className="slider">
              <div>
                <RoomFilters
                  eventSearch={eventSearch}
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
                <div className="title">
                  <h1>Room map</h1>
                </div>
                <div>
                  <Map locations={rooms} />
                </div>
              </div>
            </div>
          </>
        )}
        {loading && <div className="loader">Loading...</div>}
      </div>
    );
  }
}

RoomsList.propTypes = {
  handleSetMessage: PropTypes.func,
};

export default withAuth(withNotification(RoomsList));
