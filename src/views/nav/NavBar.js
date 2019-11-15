import React from 'react';
import { NavLink } from 'react-router-dom';

// images
import icons_comment from '../../images/icons/icons_comment.svg';
import icons_rideshare from '../../images/icons/icons_rideshare.svg';
import icons_users from '../../images/icons/icons_users.svg';

const NavBar = () => {
  return (
    <div id="navBar">
      <div className="menu-principal ripple">
        <div className="element01 ripple">
          <NavLink className="nav" to="/me-user#s2">
            <div>
              <img className="icon" src={icons_rideshare} />
            </div>
            Me
          </NavLink>
        </div>
        <div className="element02 ripple">
          <NavLink className="nav" to="/rooms/list">
            <div>
              <img className="icon" src={icons_comment} />
            </div>
            Rooms
          </NavLink>
        </div>
        <div className="element03 ripple">
          <NavLink className="nav" to="/users/list">
            <div>
              <img className="icon" src={icons_users} />
            </div>
            Users
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
