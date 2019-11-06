import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <div>
      <span>
        <NavLink to="/home">Home</NavLink>
      </span>
      <span> | </span>
      <span>
        <NavLink to="/rooms/list">Rooms</NavLink>
      </span>
      <span> | </span>
      <span>
        <NavLink to="/user">User</NavLink>
      </span>
      <span> | </span>
      <span>
        <NavLink to="/rooms/create">Create Room</NavLink>
      </span>
    </div>
  );
};

export default NavBar;
