import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../../../css/room/roomfilter.scss';

class RoomFilters extends Component {
  state = {};

  render() {
    const {
      eventSearch,
      handleSearchRoom,
      handleChangeSelectRooms,
      selectTheme,
      radiusInMeters,
      handleChangeSelectRadiusMeters,
      sortedList,
    } = this.props;
    return (
      <div>
        <div className="title">
          <h1>Rooms Filters</h1>
        </div>
        <div className="box-title-search">
          <div className="title-search ">
            <div calssName="search-text">SEARCH</div>
            <div className="colors-selected ">
              <div className="box-color01 "></div>
              <div className="box-color02 "></div>
              <div className="box-color03 "></div>
              <div className="box-color04 "></div>
            </div>
          </div>
        </div>
        <div className="section">
          <input
            className="input-filter imput-color-dark"
            name="rooms"
            value={eventSearch}
            onChange={handleSearchRoom}
          />
          <br />
          Theme:
          <select name="Select theme" value={selectTheme} onChange={handleChangeSelectRooms}>
            <option value="">All</option>
            {sortedList}
          </select>
          <br />
          Radius Km: <br />
          <select name="Select kms" defaultValue={radiusInMeters} onChange={handleChangeSelectRadiusMeters}>
            <option value="50000"> 50 km</option>
            <option value="40000"> 40 km</option>
            <option value="30000"> 30 km</option>
            <option value="20000"> 20 km</option>
            <option value="10000"> 10 km</option>
            <option value="5000"> 5 km</option>
            <option value="200"> 2 km</option>
          </select>
        </div>

        <Link to="">
          <button> create new room</button>
        </Link>
      </div>
    );
  }
}

export default RoomFilters;
