/* eslint-disable class-methods-use-this */
import React from 'react';
import { withRouter } from 'react-router-dom';
import { withAuth } from '../../../Context/AuthContext';
import getCoords from '../../../helpers/coordinates';
import RoomService from '../../../services/roomService';

const RoomCreate = props => {
  const handleSubmit = async e => {
    e.preventDefault();

    // Get date from form
    const {
      roomName: { value: roomName },
      description: { value: description },
      theme: { value: theme },
      privateRoom: { value: privateRoom },
    } = e.target;

    // Get Coords
    const {
      coords: { latitude, longitude },
    } = await getCoords();

    const body = { roomName, description, longitude, latitude, privateRoom, theme };

    console.log(body);
    // Create Room
    const created = await RoomService.createRoom(body);

    // Go to the room created
    props.history.push(`/rooms/${created._id}`);
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
