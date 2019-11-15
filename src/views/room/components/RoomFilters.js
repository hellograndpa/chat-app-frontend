/* eslint-disable react/prop-types */
import React, { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import RoomCreate from './RoomCreate';

function RoomFilters(props) {
  const [setActive, setActiveState] = useState('');
  const [setActiveCreate, setActiveStateCreate] = useState('');
  const [setHeight, setHeightState] = useState('0px');
  const [setHeightCreate, setHeightStateCreate] = useState('0px');

  const content = useRef(null);
  const contentCreate = useRef(null);

  function toggleAccordion() {
    setActiveState(setActive === '' ? 'active' : '');
    setHeightState(setActive === 'active' ? '0px' : `${content.current.scrollHeight}px`);
  }

  function toggleAccordionCreate() {
    setActiveStateCreate(setActiveCreate === '' ? 'active' : '');
    setHeightStateCreate(setActiveCreate === 'active' ? '0px' : `${contentCreate.current.scrollHeight}px`);
  }
  function closeLayer() {
    toggleAccordionCreate();
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
      <div className="title">{pgUser ? <h1>Your Rooms</h1> : <h1>Rooms Filters</h1>}</div>
      <div className="box-title-search">
        <div className="title-search ">
          <div className={`accordion ${setActive}`} onClick={toggleAccordion}>
            <div className="search-text">SEARCH</div>
          </div>
          <div className="colors-selected ">
            <div className="box-color01 "></div>
            <div className="box-color02 "></div>
            <div className="box-color03 "></div>
            <div className="box-color04 "></div>
          </div>
        </div>
        <div className="title-search "></div>
        <div className="title-search ">
          <div className={`accordion ${setActiveCreate}`} onClick={toggleAccordionCreate}>
            <div className="search-text">CREATE</div>
            <div className="colors-selected ">
              <div className="box-color01 "></div>
              <div className="box-color02 "></div>
              <div className="box-color03 "></div>
              <div className="box-color04 "></div>
            </div>
          </div>
        </div>
      </div>

      <div ref={contentCreate} style={{ maxHeight: `${setHeightCreate}` }} className="accordion__content">
        <div className="section">
          <RoomCreate closeLayer={closeLayer} />
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
