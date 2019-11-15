import axios from 'axios';

class AuthService {
  constructor() {
    this.auth = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
      withCredentials: true,
    });
  }

  signup(user) {
    const { userName, email, password, latitude, longitude } = user;
    return this.auth.post('/signup', { userName, email, password, latitude, longitude }).then(({ data }) => data);
  }

  login(user) {
    const { email, password, latitude, longitude } = user;
    return this.auth.post('/login', { email, password, latitude, longitude }).then(({ data }) => data);
  }

  logout() {
    return this.auth.get('/logout', {}).then(response => response.data);
  }

  me() {
    return this.auth.get('/me').then(response => response.data);
  }

  abandon() {
    return this.auth.get('/abandon', {}).then(response => response.data);
  }
}

const authService = new AuthService();

export default authService;
