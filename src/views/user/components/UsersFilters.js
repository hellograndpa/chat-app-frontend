import React, { useState, useRef } from 'react';

function UsersFilters(props) {
  const [setActive, setActiveState] = useState('');
  const [setHeight, setHeightState] = useState('0px');

  const content = useRef(null);

  function toggleAccordion() {
    setActiveState(setActive === '' ? 'active' : '');
    setHeightState(setActive === 'active' ? '0px' : `${content.current.scrollHeight}px`);
  }

  const {
    pgUser,
    eventSearch,
    handleSearchUser,
    selectActive,
    handleChangeSelectUsers,
    radiusInMeters,
    handleChangeSelectRadiusMeters,
  } = props;

  return (
    <div className="header || u-sticky">
      <div className="title">{pgUser ? <h1>Your Friends</h1> : <h1>Users Arroud You</h1>}</div>

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
      </div>
      <div ref={content} style={{ maxHeight: `${setHeight}` }} className="accordion__content">
        <div className="section">
          <input
            className="input-dark"
            name="users"
            placeholder="Search by Name"
            value={eventSearch}
            onChange={handleSearchUser}
          />
          {!pgUser && (
            <div className="select-wp">
              <div className="select-width-theme-60">
                <select
                  className="select-css-dark"
                  name="Selec Activity"
                  defaultValue={selectActive}
                  onChange={handleChangeSelectUsers}
                >
                  <option value="">All</option>
                  <option value="true">Actives</option>
                </select>
              </div>
              <div className="select-width-km-30 ">
                <select
                  className="select-css-dark"
                  name="Select kms"
                  defaultValue={radiusInMeters}
                  onChange={handleChangeSelectRadiusMeters}
                >
                  <option value="50"> 50 km</option>
                  <option value="40"> 40 km</option>
                  <option value="30"> 30 km</option>
                  <option value="20"> 20 km</option>
                  <option value="10"> 10 km</option>
                  <option value="5"> 5 km</option>
                  <option value="2"> 2 km</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UsersFilters;
