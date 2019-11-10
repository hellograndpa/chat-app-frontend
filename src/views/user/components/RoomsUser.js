/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
/* eslint-disable class-methods-use-this */

import React from 'react';
import { Link } from 'react-router-dom';

const RoomsUser = props => {
  const { rooms } = props;

  const handleindex = number => {
    return number & 1 ? 'card-R' : 'card-L';
  };

  return (
    <div className="room-user-content">
      <h3>
        <strong> {rooms.length} Rooms</strong> avalible arround you
      </h3>
      {rooms.map((room, index) => {
        return (
          <div className={handleindex(index)}>
            <div className="o-images ">
              <div className="o-images__inner">
                <img className="o-images__img" src={room.avatar} />
              </div>
            </div>
            <div className="title">
              <Link className="title" key={room._id} to={`../rooms/${room._id}`}>
                {room.roomName}
              </Link>
            </div>
            <div className="flex-between">
              <div className="theme">{room.theme}</div>
            </div>
            <div className="flex-between ">
              <div className="distance">
                {room.distance !== undefined && room.distanceFromMe.toFixed(2)} km from you
              </div>
              <div className="people">people in: 18</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RoomsUser;
