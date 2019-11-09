/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { withAuth } from '../../Context/AuthContext';
import { getCoords } from '../../helpers/coordinates';

class Signup extends Component {
  state = {
    userName: '',
    email: '',
    password: '',
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = async e => {
    e.preventDefault();
    const {
      coords: { latitude, longitude },
    } = await getCoords();

    const { userName, email, password } = this.state;
    const { handleSignup } = this.props;
    handleSignup({
      userName,
      email,
      password,
      latitude,
      longitude,
    });
  };

  render() {
    const { userName, email, password } = this.state;
    return (
      <div className="flex-centered">
        <form onSubmit={this.handleFormSubmit}>
          <div>
            <input
              type="text"
              name="userName"
              className="input input-label"
              placeHolder="User Name"
              value={userName}
              onChange={this.handleChange}
            />
          </div>
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
              placeHolder="password"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input type="submit" className="action-btn-big" value="Signup" />
          </div>
        </form>
      </div>
    );
  }
}

export default withAuth(Signup);
