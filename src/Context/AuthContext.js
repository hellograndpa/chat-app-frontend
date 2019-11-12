/* eslint-disable max-classes-per-file */
import React, { Component, createContext } from 'react';
import socketIOClient from 'socket.io-client';
import authService from '../services/authService';

const socket = socketIOClient('localhost:3001');

const AuthContext = createContext();

const { Provider } = AuthContext;

const AuthConsumer = AuthContext.Consumer;

export const withAuth = Comp => {
  return class WithAuth extends Component {
    render() {
      return (
        <AuthConsumer>
          {({ isLoading, isLoggedin, user, handleLogin, handleSignup, handleLogout, changeSession }) => (
            <Comp
              {...this.props}
              isLoading={isLoading}
              isLoggedin={isLoggedin}
              user={user}
              handleLogin={handleLogin}
              handleSignup={handleSignup}
              handleLogout={handleLogout}
              changeSession={changeSession}
            />
          )}
        </AuthConsumer>
      );
    }
  };
};

export default class AuthProvider extends Component {
  state = {
    isLoggedin: false,
    user: undefined,
    isLoading: true,
  };

  componentDidMount() {
    authService
      .me()
      .then(user => {
        this.setState({
          isLoggedin: true,
          user,
          isLoading: false,
        });
        socket.emit('login', user._id);
      })
      .catch(() => {
        this.setState({
          isLoading: false,
        });
      });
  }

  handleLogin = user => {
    authService
      .login(user)
      .then(loggedUser => {
        this.setState({
          isLoggedin: true,
          user: loggedUser,
          isLoading: false,
        });
        socket.emit('login', loggedUser._id);
      })
      .catch(() => {
        this.setState({
          isLoading: false,
        });
      });
  };

  handleSignup = user => {
    authService
      .signup(user)
      .then(loggedUser => {
        this.setState({
          isLoggedin: true,
          user: loggedUser,
          isLoading: false,
        });
      })
      .catch(() => {
        this.setState({
          isLoading: false,
          isLoggedin: false,
          user: undefined,
        });
      });
  };

  handleLogout = () => {
    this.setState({
      isLoading: true,
    });
    authService
      .logout()
      .then(() => {
        this.setState({
          isLoggedin: false,
          user: undefined,
          isLoading: false,
        });
        socket.emit('logout', this.state.user._id);
      })
      .catch(() => {
        this.setState({
          isLoading: false,
          isLoggedin: false,
          user: undefined,
        });
      });
  };

  changeSession = newUser => {
    const newState = { ...this.state };
    newState.user = newUser;
    this.setState({ newState });
  };

  render() {
    const { isLoading, isLoggedin, user } = this.state;
    const { children } = this.props;
    if (isLoading) {
      return <div>Loading...</div>;
    }
    return (
      <Provider
        value={{
          isLoading,
          isLoggedin,
          user,
          handleLogin: this.handleLogin,
          handleLogout: this.handleLogout,
          handleSignup: this.handleSignup,
          changeSession: this.changeSession,
        }}
      >
        {children}
      </Provider>
    );
  }
}
