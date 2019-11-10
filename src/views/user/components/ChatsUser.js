import React from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../../../Context/AuthContext';
import ChatUserService from '../../../services/chatUserService';
import { getDistanceFromMe } from '../../../helpers/coordinates';
import avatarDefault from '../../../images/avatar.svg';

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

  const handleAccept = async chatId => {
    await ChatUserService.updateChatUserStatus(chatId, 'active');
    onAccept();
  };

  // ToDo: hacer todo lo pone aquí que ni mas que menso que recger la distancia....
  const distance = async () => {
    const newdistance = chats.map(async chat => {
      const uno = await getDistanceFromMe({
        latitude: chat.userChat02.location.coordinates[0],
        logitude: chat.userChat02.location.coordinates[1],
      });
      return uno;
    });
    const pp = await Promise.all(newdistance);
    return pp;
  };

  return (
    <div className=".u-wrapper-row">
      {chats.length > 0 &&
        chats.map((chat, index) => {
          return (
            <div key={chat._id} className="">
              {/* start image of avatar */}
              <div className="o-avatar is-active w-15precent">
                <div className="o-avatar__inner">
                  <img
                    className="o-avatar__img"
                    src={chat.userChat01._id === user._id ? user.avatar : chat.userChat02.avatar}
                    alt=""
                  />
                </div>
              </div>
              {/* end image of avatar */}
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
                        <div className="title">{chat.userChat01.userName}</div>
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
            </div>
          );
        })}
    </div>
  );
};

export default withAuth(ChatsUser);
