import React from 'react';
import { Link } from 'react-router-dom';

// CSS

import '../../../css/user/userslist.scss';

const Users = props => {
  const { users } = props;
  const allDistances = users.map(user => {
    return user.distanceFromMe;
  });

  return (
    <div className="users-list-content-Bg">
      <h3>{users.length} Users arround you</h3>
      {users.map(user1 => {
        return (
          <div key={user1._id} className="users-list-line">
            <div className="avatar activo">
              <img src="" alt="" />
            </div>
            <div className="name">
              <div>
                <Link to={`/users/${user1._id}`}>
                  {user1.userName} {user1.lastName}
                </Link>
              </div>
              <div>Ciudad {user1.city}</div>
            </div>
            <div>
              <div>Distance from me {user1.distanceFromMe}</div>
              <div>Last theme {user1.userName}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Users;
