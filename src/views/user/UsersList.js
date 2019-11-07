import React, { Component } from 'react';

import { all } from 'q';
import { withNotification } from '../../Context/NotificationCtx';
import UserService from '../../services/userService';
import { getCoords, getDistance, getDistanceFromMe } from '../../helpers/coordinates';
import { emptyValidation } from '../../helpers/Validation';
import Users from './components/Users';
import Map from '../room/components/Map';

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
    console.log('TCL: UsersList -> handleUsersArroundMe -> newUsers', newUsers);
    emptyValidation(newUsers, this.props.handleSetMessage);

    this.setState({
      users: newUsers,
      searchUsers: newUsers,
      loading: false,
    });
  };

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
    if (selectTheme !== '' && radiusInMeters <= 50000) {
      users = searchUsers
        .filter(element => element.theme === selectTheme)
        .filter(element => element.distanceFromMe <= radiusInMeters);
    } else {
      users = searchUsers;
    }

    return (
      <div>
        {!loading && (
          <div>
            aa
            <div>
              <h1>Users map</h1>
              <Map locations={users} />
            </div>
            <div>
              <h1>Users Filter</h1>
              <div>
                Search: <br />
                <input name="users" value={eventSearch} onChange={this.handleSearchUser} />
                <br />
                Theme: <br />
                <select defaultValue={this.state.selectTheme} onChange={this.handleChangeSelectUser}>
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
            </div>
            <div>
              <h1>Users List</h1>
              Search <input name="userslist" value={eventSearch} onChange={this.handleSearchUser} />
              <Users users={users} />
            </div>
          </div>
        )}
        {loading && <div>loading...</div>}
      </div>
    );
  }
}

export default withNotification(UsersList);
