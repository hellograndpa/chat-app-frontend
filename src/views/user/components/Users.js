import React from 'react';
import { Link } from 'react-router-dom';

const Users = props => {
  const { users } = props;
  const allDistances = users.map(user => {
    return user.distanceFromMe;
  });

  return (
    <div>
      {users.map(user1 => {
        return (
          <div key={user1._id}>
            <Link to={`/user/${user1._id}`}>
              <div>Name {user1.userName}</div>
              <div>Last Name {user1.lastName}</div>
            </Link>
            <div>Email {user1.email}</div>
            <div>Distance from me {user1.distanceFromMe}</div>
            <div>Last theme {user1.userName}</div>
            <div>
              Avatar <img src="" alt=""></img> {user1.userName}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Users;
