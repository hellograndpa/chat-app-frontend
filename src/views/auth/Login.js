import React, { Component } from 'react';
import { withAuth } from '../../Context/AuthContext';
import { getCoords } from '../../helpers/coordinates';
import { withNotification } from '../../Context/NotificationCtx';

class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    const {
      coords: { latitude, longitude },
    } = await getCoords();

    this.props.handleLogin(
      {
        email,
        password,
        latitude,
        longitude,
      },
      this.props.handleSetMessage,
    );
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className="flex-centered-aligned full">
        <form onSubmit={this.handleFormSubmit}>
          <div>
            <input
              type="text"
              name="email"
              className="input input-label margin"
              placeholder="Email"
              value={email}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              type="password"
              className="input input-label margin"
              name="password"
              placeholder="Password"
              value={password}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input className="action-btn-big" type="submit" value="Login" />
          </div>
        </form>
      </div>
    );
  }
}

export default withNotification(withAuth(Login));
