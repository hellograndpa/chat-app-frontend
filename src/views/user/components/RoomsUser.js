/* eslint-disable class-methods-use-this */
import React from 'react';
import { Link } from 'react-router-dom';

const RoomsUser = props => {
  const { rooms } = props;

  return (
    <div>
      {rooms.map((room, index) => {
        return (
          <div key={room._id}>
            <div>
              <Link to={`../rooms/${room._id}`}>{room.roomName}</Link>
            </div>
            <div>{room.theme}</div>
            <div>Disgtande from me: {room.distanceFromMe}</div>
          </div>
        );
      })}
    </div>
  );
};

export default RoomsUser;
