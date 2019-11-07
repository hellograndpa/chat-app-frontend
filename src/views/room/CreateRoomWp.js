/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import RoomCreate from './components/RoomCreate';
import Map from './components/Map';
import { getCoords } from '../../helpers/coordinates';

class CreateRoomWp extends Component {
  state = {
    location: [{ location: { coordinates: [0, 0] } }],
  };

  async componentDidMount() {
    const {
      coords: { latitude, longitude },
    } = await getCoords();
    const location = [{ location: { coordinates: [latitude, longitude] } }];
    this.setState({ location });
  }

  render() {
    return (
      <div>
        <Map locations={this.state.location}></Map>
        <RoomCreate></RoomCreate>
      </div>
    );
  }
}

export default CreateRoomWp;
