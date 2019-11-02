import axios from 'axios';

class UserService {
  constructor() {
    this.axios = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
      withCredentials: true,
    });
  }

  getAllUser(location) {
    return this.axios.get('/api/v01/user', location).then(({ data: users }) => users);
  }

  getUserById(id) {
    return this.axios.get(`/api/v01/user/${id}`).then(({ data: user }) => user);
  }

  updateUser(user) {
    return this.axios.put(`/api/v01/user/${user._id}`, user).then(({ data: user }) => user);
  }
}

const userService = new UserService();

export default userService;
