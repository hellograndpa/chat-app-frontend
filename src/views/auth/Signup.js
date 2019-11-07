import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
    this.props.handleSignup({
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
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>User Name:</label>
          <input type="text" name="userName" value={userName} onChange={this.handleChange} />
          <label>Email:</label>
          <input type="text" name="email" value={email} onChange={this.handleChange} />
          <label>Password:</label>
          <input type="password" name="password" value={password} onChange={this.handleChange} />
          <input type="submit" value="Signup" />
        </form>

        <p>
          Already have account?
          <Link to={'/login'}> Login</Link>
        </p>
      </div>
    );
  }
}

export default withAuth(Signup);
