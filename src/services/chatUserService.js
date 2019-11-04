import axios from 'axios';

class ChatUserService {
  constructor() {
    this.axios = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
      withCredentials: true,
    });
  }

  getAllChatUserId(userId) {
    return this.axios.get(`/api/v01/chat-user/${userId}`).then(({ data: chatUsersId }) => chatUsersId);
  }

  getChatUserById(id) {
    return this.axios.get(`/api/v01/chat-user/me/${id}`).then(({ data: chatUser }) => chatUser);
  }

  createChatUser(body) {
    return this.axios.post(`/api/v01/chat-user`, body).then(({ data: chatUser }) => chatUser);
  }

  updateChatUser(chatUser) {
    return this.axios.put(`/api/v01/chat-user/${chatUser._id}`, chatUser).then(({ data: chatUser }) => chatUser);
  }

  updateChatUserStatus(chatUser, status) {
    return this.axios
      .put(`/api/v01/chat-user/${chatUser._id}/${status}`, chatUser)
      .then(({ data: chatUser }) => chatUser);
  }
}

const chatUserService = new ChatUserService();

export default chatUserService;
