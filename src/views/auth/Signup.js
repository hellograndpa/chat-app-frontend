/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { withAuth } from '../../Context/AuthContext';
import { getCoords } from '../../helpers/coordinates';
import { withNotification } from '../../Context/NotificationCtx';

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
);
const validateForm = errors => {
  let valid = true;
  Object.values(errors).forEach(val => val.length > 0 && (valid = false));
  return valid;
};

const countErrors = errors => {
  let count = 0;
  Object.values(errors).forEach(val => val.length > 0 && (count = count + 1));
  return count;
};

class Signup extends Component {
  state = {
    userName: '',
    email: '',
    password: '',
    formValid: false,
    errorCount: null,
    errors: {
      userName: '',
      email: '',
      password: '',
    },
  };

  handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case 'fullName':
        errors.userName = value.length < 5 ? 'Full Name must be 5 characters long!' : '';
        break;
      case 'email':
        errors.email = validEmailRegex.test(value) ? '' : 'Email is not valid!';
        break;
      case 'password':
        errors.password = value.length < 8 ? 'Password must be 8 characters long!' : '';
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };

  handleFormSubmit = async e => {
    e.preventDefault();
    this.setState({
      formValid: validateForm(this.state.errors),
      errorCount: countErrors(this.state.errors),
    });
    if (this.state.formValid) {
      const {
        coords: { latitude, longitude },
      } = await getCoords();

      const { userName, email, password } = this.state;
      const { handleSignup, handleSetMessage } = this.props;
      handleSignup(
        {
          userName,
          email,
          password,
          active: true,
          latitude,
          longitude,
        },
        handleSetMessage,
      );
    }
  };

  render() {
    const { userName, email, password, errors, formValid } = this.state;
    return (
      <div className="flex-centered-aligned full">
        <div className="form-wrapper">
          <form onSubmit={this.handleFormSubmit} noValidate>
            <div>
              <input
                type="text"
                name="userName"
                className="input input-label margin"
                placeholder="User Name"
                value={userName}
                onChange={this.handleChange}
                noValidate
              />{' '}
              <br />
              {errors.userName.length > 0 && <span className="error">{errors.userName}</span>}
            </div>
            <div>
              <input
                type="text"
                name="email"
                className="input input-label margin"
                placeholder="Email"
                value={email}
                onChange={this.handleChange}
                noValidate
              />
              <br />
              {errors.email.length > 0 && <span className="error">{errors.email}</span>}
            </div>
            <div>
              <input
                type="password"
                className="input input-label margin"
                placeholder="password"
                name="password"
                value={password}
                onChange={this.handleChange}
                noValidate
              />
              <br />
              {errors.password.length > 0 && <span className="error">{errors.password}</span>}
            </div>
            <div className="info">
              <small>Password must be eight characters in length.</small>
            </div>
            <div>
              <input type="submit" className="action-btn-big" value="Signup" />
            </div>
            {this.state.errorCount !== null ? (
              <p className="form-status">Form is {formValid ? 'valid ✅' : 'invalid ❌'}</p>
            ) : (
              'Form not submitted'
            )}
          </form>
        </div>
      </div>
    );
  }
}

export default withNotification(withAuth(Signup));
