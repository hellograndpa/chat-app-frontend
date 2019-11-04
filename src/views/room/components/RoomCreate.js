/* eslint-disable class-methods-use-this */
import React from 'react';
import { withRouter } from 'react-router-dom';
import { withAuth } from '../../../Context/AuthContext';
import getCoords from '../../../helpers/coordinates';
import RoomService from '../../../services/roomService';

const RoomCreate = props => {
  const handleSubmit = async e => {
    e.preventDefault();
    const {
      roomName: { value: roomName },
      description: { value: description },
      theme: { value: theme },
      privateRoom: { value: privateRoom },
    } = e.target;

    const {
      coords: { latitude, longitude },
    } = await getCoords();

    const body = { roomName, description, longitude, latitude, privateRoom, theme };

    const created = await RoomService.createRoom(body);

    props.history.push('/rooms');
  };

  return (
    <div>
      <h1>Create a Room</h1>
      <form name="frmRoom" onSubmit={handleSubmit}>
        <div>
          name:<input type="text" name="roomName"></input>
        </div>
        <div>
          description:<input type="text" name="description"></input>
        </div>
        <div>
          theme:
          <select name="theme">
            <option value="Travel">Travel</option>
            <option value="Party">Party</option>
            <option value="News">News</option>
            <option value="Shopping">Shopping</option>
            <option value="Pets">Pets</option>
          </select>
        </div>
        <div>
          <label>
            Private?
            <input type="checkbox" name="privateRoom" value="true"></input>
          </label>
        </div>

        <div>
          <input type="submit" value="Create"></input>
        </div>
      </form>
    </div>
  );
};

export default withRouter(withAuth(RoomCreate));
