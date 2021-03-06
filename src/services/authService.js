import axios from 'axios';

class AuthService {
  constructor() {
    this.auth = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
      withCredentials: true,
    });
  }

  signup(user) {
    const { userName, email, password, latitude, longitude, active } = user;
    return this.auth
      .post('/signup', { userName, email, password, latitude, longitude, active })
      .then(({ data }) => data);
  }

  login(user) {
    const { email, password, latitude, longitude } = user;
    return this.auth.post('/login', { email, password, latitude, longitude }).then(({ data }) => data);
  }

  logout() {
    return this.auth.get('/logout', {}).then(response => response.data);
  }

  async me() {
    const response = await this.auth.get('/me');
    return response.data;
  }

  abandon() {
    return this.auth.get('/abandon');
  }

  remember() {
    return this.auth.get('/remember');
  }
}

const authService = new AuthService();

export default authService;
