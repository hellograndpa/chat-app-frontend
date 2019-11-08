import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Email:</label>
          <input type="text" name="email" value={email} onChange={this.handleChange} />
          <label>Password:</label>
          <input type="password" name="password" value={password} onChange={this.handleChange} />
          <input type="submit" value="Signup" />
        </form>
        <p>
          I dont have an accoun?
          <Link to={'/signup'}> Singup</Link>
        </p>
      </div>
    );
  }
}

export default withAuth(Login);
