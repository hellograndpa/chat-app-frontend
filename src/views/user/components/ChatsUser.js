import React from 'react';
import { Link } from 'react-router-dom';
import { promised } from 'q';
import { withAuth } from '../../../Context/AuthContext';
import ChatUserService from '../../../services/chatUserService';
import { getDistanceFromMe } from '../../../helpers/coordinates';

const ChatsUser = props => {
  const { searchChats, selectStatus, onSelect, user, onAccept } = props;

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

  let chats = [];
  if (selectStatus !== '') {
    chats = searchChats.filter(element => element.status === selectStatus);
  } else {
    chats = searchChats;
  }
  console.log(chats);

  const handleAccept = async chatId => {
    await ChatUserService.updateChatUserStatus(chatId, 'active');
    onAccept();
  };

  // ToDo: hacer todo lo pone aquí....
  const distance = async () => {
    const newdistance = chats.map(async chat => {
      const uno = await getDistanceFromMe({
        latitude: chat.userChat02.location.coordinates[0],
        logitude: chat.userChat02.location.coordinates[1],
      });
      return uno;
    });
    const pp = await Promise.all(newdistance);
    console.log('TCL: distance -> pp', pp);
    return pp;
  };

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
              {chat.status === 'pending' ? (
                <>
                  {chat.userChat01._id === user._id ? (
                    <>
                      {chat.userChat02.userName}
                      {/* {
                        await getDistanceFromMe({
                          latitude: chat.userChat02.location.coordinates[0],
                          logitude: chat.userChat02.location.coordinates[1],
                        })
                      } */}
                    </>
                  ) : (
                    <>
                      {chat.userChat01.userName}
                      {/* {
                        await getDistanceFromMe({
                          latitude: chat.userChat01.location.coordinates[0],
                          logitude: chat.userChat01.location.coordinates[1],
                        })
                      } */}
                    </>
                  )}
                  {chat.userChat02._id === user._id ? (
                    <button onClick={() => handleAccept(chat._id)}>Aceptar</button>
                  ) : (
                    ' Pending...'
                  )}
                </>
              ) : (
                <Link to={`/users/private-chat/${chat._id}`}>
                  {chat.userChat01._id === user._id ? chat.userChat02.userName : chat.userChat01.userName}
                </Link>
              )}
            </div>
            <div>
              avatar <img alt="" src={`/avatar/${chat.userChat02.avatar}`} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default withAuth(ChatsUser);
