/* eslint-disable max-classes-per-file */
import React, { Component, createContext } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

const { Provider } = AuthContext;

const AuthConsumer = AuthContext.Consumer;

export const withAuth = Comp => {
  return class WithAuth extends Component {
    render() {
      return (
        <AuthConsumer>
          {({
            isLoading,
            isLoggedin,
            user,
            handleLogin,
            handleSignup,
            handleLogout,
            changeSession,
            handleAbandon,
            handleRemember,
          }) => (
            <Comp
              {...this.props}
              isLoading={isLoading}
              isLoggedin={isLoggedin}
              user={user}
              handleLogin={handleLogin}
              handleSignup={handleSignup}
              handleLogout={handleLogout}
              changeSession={changeSession}
              handleAbandon={handleAbandon}
              handleRemember={handleRemember}
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

  async componentDidMount() {
    try {
      const user = await authService.me();
      this.setState({
        isLoggedin: true,
        user,
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        isLoading: false,
      });
    }
  }

  handleLogin = (user, handleMessage) => {
    authService
      .login(user)
      .then(loggedUser => {
        this.setState({
          isLoggedin: true,
          user: loggedUser,
          isLoading: false,
        });
      })
      .catch(() => {
        handleMessage({ typeMessage: 'error', message: 'User y/o password are not correct' });

        this.setState({
          isLoading: false,
        });
      });
  };

  handleSignup = (user, handleMessage) => {
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
        handleMessage({ typeMessage: 'error', message: 'There was an error, please try again' });
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
      })
      .catch(() => {
        this.setState({
          isLoading: false,
          isLoggedin: false,
          user: undefined,
        });
      });
  };

  handleAbandon = async () => {
    await authService.abandon();
  };

  handleRemember = async () => {
    await authService.remember();
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
          handleAbandon: this.handleAbandon,
          handleRemember: this.handleRemember,
        }}
      >
        {children}
      </Provider>
    );
  }
}
