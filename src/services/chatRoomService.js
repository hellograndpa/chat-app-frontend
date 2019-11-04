import axios from 'axios';

class ChatUserService {
  constructor() {
    this.axios = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
      withCredentials: true,
    });
  }

  updateChatUser(chatRoomId, text) {
    return this.axios.put(`/api/v01/chat-room/${chatRoomId}`, { text }).then(({ data: chatUser }) => chatUser);
  }
}

const chatUserService = new ChatUserService();

export default chatUserService;
