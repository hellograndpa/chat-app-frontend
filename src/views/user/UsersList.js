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
import { getCoords, getDistance, getDistanceFromMe } from '../../helpers/coordinates';
import { emptyValidation } from '../../helpers/Validation';

const socket = socketIOClient('localhost:3001');

class UsersList extends Component {
  state = {
    users: [],
    searchUsers: [],
    radiusInMeters: 50000,
    selectTheme: '',
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
  handleUsersArroundMe = (latitude, longitude, radiusInMeters) => {
    UserService.getAllUsers(latitude, longitude, radiusInMeters)
      .then(async users => {
        const newUsers = await users.map(async user => {
          const location = { latitude: user.location.coordinates[0], longitude: user.location.coordinates[1] };
          user.distanceFromMe = await getDistanceFromMe(location);
          return user;
        });
        return Promise.all(newUsers);
      })
      .then(newUsers => {
        this.resultUsers(newUsers);
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleSearchUser = event => {
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

  handleChangeSelectUsers = event => {
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

    this.handleUsersArroundMe(latitude, longitude, radiusInMeters / 1000);

    socket.on('user-connected', user => {
      // TODO: control user conected
    });
  };

  render() {
    const { searchUsers, selectTheme, loading, eventSearch, radiusInMeters } = this.state;

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
    if (selectTheme !== '' && radiusInMeters <= 50001) {
      users = searchUsers
        .filter(element => element.theme === selectTheme)
        .filter(element => element.distanceFromMe <= radiusInMeters);
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
            Prev
          </a>
          <a href="#s2" className="o-top-nav__btn o-top-nav__btn--next || o-btn">
            Next
          </a>
        </div>
        {/* end nav top */}
        {!loading && (
          <>
            <div className="slider">
              <div>
                <div className="title">
                  <h1>Users map</h1>
                </div>
                <div>
                  <Map locations={users} />
                </div>
              </div>
              <div>
                <UsersFilters
                  eventSearch={eventSearch}
                  handleSearchUser={this.handleSearchUser}
                  sortedList={sortedList}
                  selectTheme={this.state.selectTheme}
                  handleChangeSelectUser={this.handleChangeSelectUser}
                  radiusInMeters={this.state.radiusInMeters}
                  handleChangeSelectRadiusMeters={this.handleChangeSelectRadiusMeters}
                />
                <Users users={users} />
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
