import axios from 'axios';

class UserService {
  constructor() {
    this.axios = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
      withCredentials: true,
    });
  }

  getAllUsers(latitude, longitude, radiusInMeters) {
    return this.axios.post('/api/v01/user', { latitude, longitude, radiusInMeters }).then(({ data: users }) => users);
  }

  getUserById(id) {
    return this.axios.get(`/api/v01/user/${id}`).then(({ data: user }) => user);
  }

  updateUser(_id, userName, lastName, email, age, city, latitude, longitude) {
    return this.axios
      .put(`/api/v01/user/${_id}`, { userName, lastName, email, age, city, latitude, longitude })
      .then(({ data: user }) => user);
  }

  updateUserAvatar(_id, avatar) {
    return this.axios.put(`/api/v01/user/${_id}/image`, { avatar }).then(({ data: user }) => user);
  }
}

const userService = new UserService();

export default userService;
