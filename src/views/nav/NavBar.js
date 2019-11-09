import React from 'react';
import { NavLink } from 'react-router-dom';

// images
import icons_comment from '../../images/icons/icons_comment.svg';
import icons_rideshare from '../../images/icons/icons_rideshare.svg';
import icons_users from '../../images/icons/icons_users.svg';

const NavBar = () => {
  return (
    <div>
      <div className="menu-principal ripple">
        <di className="element01 ripple">
          <div>
            <img className="icon" src={icons_rideshare} />
          </div>
          <NavLink className="nav" to="/">
            You
          </NavLink>
        </di>
        <div className="element02 ripple">
          <div>
            <img className="icon" src={icons_comment} />
          </div>
          <NavLink className="nav" to="/rooms/list">
            Rooms
          </NavLink>
        </div>
        <div className="element03 ripple">
          <div>
            <img className="icon" src={icons_users} />
          </div>
          <NavLink className="nav" to="/users/list">
            Users
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
