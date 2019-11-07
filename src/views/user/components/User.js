/* eslint-disable react/prop-types */
import React from 'react';
import ChatUserService from '../../../services/chatUserService';

const UserMe = props => {
  const { user, showuser } = props;
  const handleInvite = () => {
    const body = { userChat01: user._id, userChat02: showuser._id };
    ChatUserService.createChatUser(body);
  };

  return (
    <div>
      {user && (
        <>
          <div>Name {showuser.userName}</div>
          <div>Last Name {showuser.lastName}</div>
          <div>Email {showuser.email}</div>
          <div>Last theme {showuser.userName}</div>

          <div>
            Avatar <img src="" alt=""></img> {showuser.userName}
          </div>
          {user._id !== showuser._id ? (
            <>
              <button onClick={() => handleInvite()}>Invitar</button>
            </>
          ) : (
            ''
          )}
        </>
      )}
    </div>
  );
};

export default UserMe;
