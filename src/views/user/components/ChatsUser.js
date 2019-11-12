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
    <div className="u-wrapper-flex-wrap u-wrapper-flex-wrap__cont-center">
      {chats.length > 0 &&
        chats.map((chat, index) => {
          return (
            <div className="flex-centered-vetically w-40precent box-list-user color" key={user._id}>
              {/* start image of avatar */}
              <div className="o-avatar is-active w-75precent ">
                <div className="o-avatar__inner">
                  <img
                    className="o-avatar__img"
                    src={chat.userChat01._id === user._id ? chat.userChat02.avatar : user.avatar}
                    alt=""
                  />
                </div>
                <div>
                  {/* end image of avatar */}
                  <div>
                    {chat.status === 'pending' ? (
                      <>
                        {chat.userChat01._id === user._id ? (
                          <>
                            <div className="title">
                              {chat.userChat02.userName} {chat.userChat02.lastName}
                            </div>
                            {/* {
                        await getDistanceFromMe({
                          latitude: chat.userChat02.location.coordinates[0],
                          logitude: chat.userChat02.location.coordinates[1],
                        })
                      } */}
                          </>
                        ) : (
                          <>
                            <div className="title">
                              {chat.userChat01.userName} {chat.userChat01.lastName}
                            </div>
                            {/* {
                        await getDistanceFromMe({
                          latitude: chat.userChat01.location.coordinates[0],
                          logitude: chat.userChat01.location.coordinates[1],
                        })
                      } */}
                          </>
                        )}
                        {chat.userChat02._id === user._id ? (
                          <button className="o-btn margin o-btn--sm" onClick={() => handleAccept(chat._id)}>
                            ACEPTAR
                          </button>
                        ) : (
                          <div className="o-btn margin o-btn--sm is-disabled"> PENDING</div>
                        )}
                      </>
                    ) : (
                      <Link className="o-btn margin o-btn--sm" to={`/users/private-chat/${chat._id}`}>
                        OPEN CHAT
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default withAuth(ChatsUser);
