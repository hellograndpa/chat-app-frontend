import React from 'react';
import { NavLink } from 'react-router-dom';
import { withAuth } from '../../../Context/AuthContext';
import ChatUserService from '../../../services/chatUserService';

const ChatsUser = props => {
  const { searchChats, selectStatus, user, onAccept } = props;

  const userFriend = (user01, user02) => {
    if (user01._id === user._id) {
      return user02;
    }
    return user01;
  };

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

  return (
    <div className="u-wrapper-flex-wrap u-wrapper-flex-wrap__cont-center">
      {chats.length > 0 &&
        chats.map((chat, index) => {
          return (
            <div className="flex-centered-vetically w-40precent box-list-user color" key={chat._id}>
              {/* start image of avatar */}
              {/* <div className="o-avatar is-active w-75precent "> */}
              <div
                className={
                  userFriend(chat.userChat01, chat.userChat02).active
                    ? 'o-avatar is-active w-75precent'
                    : 'o-avatar w-75precent'
                }
              >
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
                          </>
                        ) : (
                          <>
                            <div className="title">
                              {chat.userChat01.userName} {chat.userChat01.lastName}
                            </div>
                          </>
                        )}
                        {chat.userChat02._id === user._id ? (
                          <div className="o-btn margin o-btn--sm" onClick={() => handleAccept(chat._id)}>
                            ACEPTAR
                          </div>
                        ) : (
                          <div className="o-btn margin o-btn--sm is-disabled"> PENDING</div>
                        )}
                      </>
                    ) : (
                      <>
                        {chat.userChat01._id === user._id ? (
                          <>
                            <div className="title">
                              {chat.userChat02.userName} {chat.userChat02.lastName}
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="title">
                              {chat.userChat01.userName} {chat.userChat01.lastName}
                            </div>
                          </>
                        )}
                        <NavLink className="o-btn margin o-btn--sm" to={`/users/private-chat/${chat._id}`}>
                          OPEN CHAT
                        </NavLink>
                      </>
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
