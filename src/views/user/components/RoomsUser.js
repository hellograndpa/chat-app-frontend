/* eslint-disable class-methods-use-this */
import React from 'react';
import { Link } from 'react-router-dom';

const RoomsUser = props => {
  const { user, rooms } = props;

  return (
    <div>
      <h1> List User Rooms</h1>
      {rooms.map((room, index) => {
        return (
          <div key={room._id}>
            <div>
              <Link to={`../${room._id}`}>{room.roomName}</Link>
            </div>
            <div>{room.theme}</div>
          </div>
        );
      })}
    </div>
  );
};

export default RoomsUser;
