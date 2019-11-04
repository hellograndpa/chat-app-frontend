/* eslint-disable class-methods-use-this */
import React from 'react';
import { Link } from 'react-router-dom';

const RoomsUser = props => {
  const { searchRooms, selectTheme, onSelect } = props;

  const themes = [...new Set(searchRooms.map(room => room.theme))];

  const sortedList = themes
    .sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    })
    .map((room, index) => (
      <option key={index} value={room}>
        {room}
      </option>
    ));
  console.log('TCL: sortedList', sortedList);
  let rooms = [];
  if (selectTheme !== '') {
    rooms = searchRooms.filter(element => element.theme === selectTheme);
  } else {
    rooms = searchRooms;
  }
  return (
    <div>
      <div>
        <select value="" onChange={onSelect}>
          <option>Select theme</option>
          <option value="">All</option>
          {sortedList}
        </select>
      </div>
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
