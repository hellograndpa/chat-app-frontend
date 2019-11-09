import React, { Component } from 'react';
import { withAuth } from '../../Context/AuthContext';
import { getCoords } from '../../helpers/coordinates';

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

    this.props.handleLogin({
      email,
      password,
      latitude,
      longitude,
    });
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className="flex-centered">
        <form onSubmit={this.handleFormSubmit}>
          <div>
            <input
              type="text"
              name="email"
              className="input input-label"
              placeHolder="Email"
              value={email}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              type="password"
              className="input input-label"
              name="password"
              placeHolder="Password"
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

export default withAuth(Login);
