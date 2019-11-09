/* eslint-disable react/prop-types */
/* eslint-disable class-methods-use-this */

import React from 'react';
import { Link } from 'react-router-dom';

const RoomsUser = props => {
  const { rooms } = props;

  return (
    <div className="room-user-content">
      {rooms.map(room => {
        return (
          <Link key={room._id} to={`../rooms/${room._id}`}>
            <div className="card">
              <div className="title">{room.roomName}</div>
              <div className="flex-between">
                <div>{room.theme}</div>
                <div>Last chat 12mn</div>
              </div>

              <div className="flex-between">
                <div>{room.distanceFromMe.toFixed(2)} km from you</div>
                <div>people in: 18</div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default RoomsUser;
