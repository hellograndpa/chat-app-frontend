import axios from 'axios';

class ChatUserService {
  constructor() {
    this.axios = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
      withCredentials: true,
    });
  }

  updateChatUser(chatRoom) {
    return this.axios.put(`/api/v01/chat-room/${chatRoom._id}`, chatUser).then(({ data: chatUser }) => chatUser);
  }
}

const chatUserService = new ChatUserService();

export default chatUserService;
