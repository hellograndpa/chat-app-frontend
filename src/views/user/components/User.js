/* eslint-disable class-methods-use-this */
import React from 'react';

const UserMe = props => {
  const { user } = props;
  return (
    <div>
      <div>Name {user.userName}</div>
      <div>Last Name {user.lastName}</div>
      <div>Email {user.email}</div>
      <div>Last theme {user.userName}</div>
      <div>
        Avatar <a href=""></a> {user.userName}
      </div>
    </div>
  );
};

export default UserMe;
