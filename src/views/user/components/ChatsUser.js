import React from 'react';
import { Link } from 'react-router-dom';

const ChatsUser = props => {
  const { searchChats, selectStatus, onSelect } = props;

  const status = [...new Set(searchChats.map(chat => chat.status))];

  const sortedList = status
    .sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    })
    .map((chatStatus, index) => (
      <option key={index} value={chatStatus}>
        {chatStatus}
      </option>
    ));
  console.log('TCL: sortedList', sortedList);
  let chats = [];
  if (selectStatus !== '') {
    chats = searchChats.filter(element => element.status === selectStatus);
  } else {
    chats = searchChats;
  }
  return (
    <div>
      <div>
        <select value="" onChange={onSelect}>
          <option value="">Select theme</option>
          <option value="">All</option>
          {sortedList}
        </select>
      </div>
      {chats.map((chat, index) => {
        return (
          <div key={chat._id}>
            <div>
              <Link to={`/me/${chat._id}`}>{chat.userChat01.userName}</Link>
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
