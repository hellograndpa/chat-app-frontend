/* eslint-disable class-methods-use-this */
import React from 'react';
import { Link } from 'react-router-dom';

const ChatsUser = props => {
  const { user, chats } = props;

  return (
    <div>
      <h1> List User Chats</h1>
      {chats.map((chat, index) => {
        return (
          <div key={chat._id}>
            <div>
              <Link to={`/me/${chat._id}`}>{chat.userChat01}</Link>
            </div>
            <div>
              avatar <img src={`/avatar/${chat.userChat02.avatar}`} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatsUser;
