import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <>
      <div>
        <div>izq</div>
        <div>der</div>
      </div>
      <div>
        <span>
          <NavLink to="/">You</NavLink>
        </span>
        <span>
          <NavLink to="/rooms/list">Rooms Tour</NavLink>
        </span>
        <span>
          <NavLink to="/users/list">Users Tour</NavLink>
        </span>
      </div>
    </>
  );
};

export default NavBar;
