import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../../Context/AuthContext';

class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    const success = pos => {
      const { latitude, longitude } = pos.coords;
      this.props.handleLogin({
        email,
        password,
        latitude,
        longitude,
      });
    };

    navigator.geolocation.getCurrentPosition(success);
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
          <input type="submit" value="Login" />
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
