import React, { useState, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';

import '../../../css/room/roomfilter.scss';

function RoomFilters(props) {
  const [setActive, setActiveState] = useState('');
  const [setHeight, setHeightState] = useState('0px');

  const content = useRef(null);

  function toggleAccordion() {
    setActiveState(setActive === '' ? 'active' : '');
    setHeightState(setActive === 'active' ? '0px' : `${content.current.scrollHeight}px`);
  }

  const {
    eventSearch,
    handleSearchRoom,
    handleChangeSelectRooms,
    selectTheme,
    radiusInMeters,
    handleChangeSelectRadiusMeters,
    sortedList,
    pgUser,
  } = props;

  return (
    <div className="header || u-sticky">
      <div className="title">{pgUser ? <h1>Your Rooms Filters</h1> : <h1>Rooms Filters</h1>}</div>
      <div className="box-title-search">
        <div className="title-search ">
          <button className={`accordion ${setActive}`} onClick={toggleAccordion}>
            <div calssName="search-text">SEARCH</div>
          </button>
          <div className="colors-selected ">
            <div className="box-color01 "></div>
            <div className="box-color02 "></div>
            <div className="box-color03 "></div>
            <div className="box-color04 "></div>
          </div>
        </div>
        <div className="title-search ">
          <NavLink to="/rooms/create" className="accordion ">
            <div calssname="search-text">CREATE</div>
          </NavLink>
        </div>
      </div>

      <div ref={content} style={{ maxHeight: `${setHeight}` }} className="accordion__content">
        <div className="section">
          <input
            className="input-dark"
            name="rooms"
            placeholder="Search by title"
            value={eventSearch}
            onChange={handleSearchRoom}
          />
          <div className="select-wp">
            <div className="select-width-theme-60">
              <select
                placeholder="Select a theme select-width-theme-60"
                className="select-css-dark"
                name="Select theme"
                value={selectTheme}
                onChange={handleChangeSelectRooms}
              >
                <option value="">Select Theme</option>
                {sortedList}
              </select>
            </div>
            <div className="select-width-km-30 ">
              <select
                className="select-css-dark select-width-km-30"
                name="Select kms"
                defaultValue={radiusInMeters}
                onChange={handleChangeSelectRadiusMeters}
              >
                <option value="50000"> 50 km</option>
                <option value="40000"> 40 km</option>
                <option value="30000"> 30 km</option>
                <option value="20000"> 20 km</option>
                <option value="10000"> 10 km</option>
                <option value="5000"> 5 km</option>
                <option value="200"> 2 km</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomFilters;
