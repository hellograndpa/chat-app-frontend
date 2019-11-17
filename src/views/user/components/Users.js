import React from 'react';
import { Link } from 'react-router-dom';
import avatarDefault from '../../../images/avatar.svg';
// CSS

const Users = props => {
  const { users } = props;

  return (
    <div className="users-list-content-Bg">
      <h3>{users.length} Users arround you</h3>
      {users.map(user1 => {
        console.log(user1);
        return (
          <div key={user1._id} className="users-list-line">
            <div className={user1.active ? 'o-avatar is-active w-15precent' : 'o-avatar w-15precent'}>
              <div className="o-avatar__inner">
                <img className="o-avatar__img" src={user1.avatar !== '' ? user1.avatar : avatarDefault} alt="" />
              </div>
            </div>

            <div className="text-user">
              <Link className="name" to={`/users/${user1._id}`}>
                <strong>
                  {user1.userName} {user1.lastName}
                </strong>
              </Link>

              <div>Ciudad: {user1.city}</div>
              <div>Interests: {user1.themes.join(',')}</div>
            </div>

            <div className="distance">
              <div className="oval">{user1.distanceFromMe.toFixed(1)} km</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Users;
