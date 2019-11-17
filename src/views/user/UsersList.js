import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';

// Context
import { withNotification } from '../../Context/NotificationCtx';

// Services
import UserService from '../../services/userService';

// Components
import Users from './components/Users';
import UsersFilters from './components/UsersFilters';
import Map from '../room/components/Map';

// Helpers
import { getCoords, getDistance } from '../../helpers/coordinates';
import { emptyValidation } from '../../helpers/Validation';

const socket = socketIOClient(process.env.REACT_APP_SOCKET_URL);

class UsersList extends Component {
  state = {
    users: [],
    searchUsers: [],
    radiusInMeters: 500,
    selectActive: '',
    eventSearch: '',
    loading: true,
  };

  resultUsers = async newUsers => {
    emptyValidation(newUsers, this.props.handleSetMessage);

    this.setState({
      users: newUsers,
      searchUsers: newUsers,
      loading: false,
    });
  };

  // Get all user arrownd you we are using the helper getDistanceFromMe
  handleUsersArroundMe = async (latitude, longitude, radiusInMeters) => {
    const myLocation = await getCoords();
    UserService.getAllUsers(latitude, longitude, radiusInMeters)

      .then(async users => {
        const newUsers = users.map(user => {
          const location = { latitude: user.location.coordinates[0], longitude: user.location.coordinates[1] };
          user.distanceFromMe = getDistance(myLocation.coords, location);
          return user;
        });
        return newUsers;
      })
      .then(newUsers => {
        this.resultUsers(newUsers);
      })
      .catch(error => {
        console.log(error);
      });
  };

  // SEARCH INPUT SEARCH BY NAME

  handleSearchUser = event => {
    event.preventDefault();

    const { users } = this.state;

    let searchUsers;
    let newEventSearch;
    if (event !== '') {
      searchUsers = users.filter(
        element => element.userName.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1,
      );
      newEventSearch = event.target.value;
    } else {
      searchUsers = users;
    }
    this.setState({
      searchUsers,
      eventSearch: newEventSearch,
    });
    emptyValidation(searchUsers, this.props.handleSetMessage);
  };

  // SELECT INPUT FILTER BY ACTIVITY

  handleChangeSelectUsers = event => {
    event.preventDefault();
    if (event.target.value === 'true') {
      this.setState({
        selectActive: true,
      });
    }
    if (event.target.value === 'false') {
      this.setState({
        selectActive: false,
      });
    }
    if (event.target.value === '') {
      this.setState({
        selectActive: '',
      });
    }
  };

  handleChangeSelectRadiusMeters = event => {
    event.preventDefault();
    this.setState({
      radiusInMeters: event.target.value,
    });
  };

  componentDidMount = async () => {
    const {
      coords: { latitude, longitude },
    } = await getCoords();
    const { radiusInMeters } = this.state;

    this.handleUsersArroundMe(latitude, longitude, radiusInMeters);

    socket.on('login', () => {
      this.handleUsersArroundMe(latitude, longitude, radiusInMeters);
    });
    socket.on('logout', () => {
      this.handleUsersArroundMe(latitude, longitude, radiusInMeters);
    });
  };

  render() {
    const { searchUsers, selectActive, loading, eventSearch, radiusInMeters } = this.state;

    let themes = [];
    if (searchUsers && searchUsers.length > 0) {
      themes = [...new Set(searchUsers.map(users => users.themes))];
    }
    const sortedList = themes
      .sort((a, b) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
      })
      .map((users, index) => (
        <option key={index} value={users}>
          {users}
        </option>
      ));

    let users = [];
    if (selectActive !== '' || radiusInMeters <= 51) {
      if (!loading) {
        users = searchUsers;
        if (selectActive !== '') {
          users = users.filter(element => element.active === selectActive);
        }
        if (radiusInMeters <= 51) {
          users = users.filter(element => element.distanceFromMe <= radiusInMeters);
        }
      }
    } else {
      users = searchUsers;
    }

    return (
      <div className="CSSgal">
        <s id="s1"></s>
        <s id="s2"></s>
        <s id="s3"></s>
        {/* nav top */}
        <div className="o-top-nav o-top-nav--rel">
          <a href="#s1" className="o-top-nav__btn || o-btn">
            Users
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
                <UsersFilters
                  eventSearch={eventSearch}
                  handleSearchUser={this.handleSearchUser}
                  sortedList={sortedList}
                  selectActive={selectActive}
                  handleChangeSelectUsers={this.handleChangeSelectUsers}
                  radiusInMeters={radiusInMeters}
                  handleChangeSelectRadiusMeters={this.handleChangeSelectRadiusMeters}
                />
                <Users users={users} />
              </div>
              <div>
                <div className="title">
                  <h1>Users map</h1>
                </div>
                <Map locations={users} />
              </div>
            </div>
          </>
        )}
        {loading && <div className="loader">Loading...</div>}
      </div>
    );
  }
}

export default withNotification(UsersList);