import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <>
      <div>
        <div>izq</div>
        <div>der</div>
      </div>
      <div draggable="false">
        <span>
          <NavLink to="/home">Home</NavLink>
        </span>
        <span>
          <NavLink to="/rooms/list">Rooms</NavLink>
        </span>
        <span>
          <NavLink to="/users/list">Users</NavLink>
        </span>
        <span>
          <NavLink to="/user">User</NavLink>
        </span>
        <span>
          <NavLink to="/rooms/create">Create Room</NavLink>
        </span>
      </div>
    </>
  );
};

export default NavBar;
