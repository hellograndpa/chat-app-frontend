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
  _isMounted = false;

  _timeoutID = 0;

  state = {
    notification: {
      typeMessage: '',
      message: '',
    },
    status: false,
  };

  componentDidMount() {
    this._isMounted = true;
  }

  handleAutoCloseMessage = () => {
    if (this._isMounted) {
      this._timeoutID = setTimeout(() => {
        this.setState({
          status: false,
        });
      }, 5000);
    }
  };

  handleSetMessage = notification => {
    const { typeMessage, message } = notification;
    if (this._isMounted) {
      this.setState({
        notification: {
          typeMessage,
          message,
        },
        status: true,
      });
      this.handleAutoCloseMessage();
    }
  };

  handleCloseMessage = () => {
    if (this._isMounted) {
      this.setState({
        status: false,
      });
    }
  };

  componentWillUnmount() {
    this._isMounted = false;
    clearTimeout(this._timeoutID);
  }

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
