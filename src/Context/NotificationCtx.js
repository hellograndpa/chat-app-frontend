/* eslint-disable max-classes-per-file */
import React, { Component, createContext } from 'react';

const NotificationCtx = createContext();

const { Provider } = NotificationCtx;

const NotificationConsumer = NotificationCtx.Consumer;

export const withNotification = Comp => {
  return class WithNotification extends Component {
    render() {
      return (
        <NotificationConsumer>
          {({ notification, status, handleSetMessage, handleCloseMessage }) => (
            <Comp
              notification={notification}
              status={status}
              handleSetMessage={handleSetMessage}
              handleCloseMessage={handleCloseMessage}
              {...this.props}
            />
          )}
        </NotificationConsumer>
      );
    }
  };
};

export default class NotificationProvider extends Component {
  state = {
    notification: {
      typeMessage: '',
      message: '',
    },
    status: false,
  };

  handleAutoCloseMessage = () => {
    setTimeout(() => {
      this.setState({
        status: false,
      });
    }, 5000);
  };

  handleSetMessage = notification => {
    const { typeMessage, message } = notification;
    this.setState({
      notification: {
        typeMessage,
        message,
      },
      status: true,
    });
    this.handleAutoCloseMessage();
  };

  handleCloseMessage = () => {
    this.setState({
      status: false,
    });
  };

  render() {
    const { notification, status } = this.state;
    const { children } = this.props;
    return (
      <Provider
        value={{
          notification,
          status,
          handleSetMessage: this.handleSetMessage,
          handleCloseMessage: this.handleCloseMessage,
        }}
      >
        {children}
      </Provider>
    );
  }
}
