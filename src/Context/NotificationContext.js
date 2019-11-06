import React, { Component } from 'react';

const { Consumer, Provider } = React.createContext();

// Utils
// ==============================

function clone(arr) {
  return arr.slice(0);
}

// Styled Components
// ==============================

const ToastContainer = props => (
  <div
    style={{
      position: 'fixed',
      right: 0,
      top: 0,
    }}
    {...props}
  />
);
const Toast = ({ children, onDismiss }) => (
  <div
    style={{
      background: 'LemonChiffon',
      cursor: 'pointer',
      fontSize: 14,
      margin: 10,
      padding: 10,
    }}
    onClick={onDismiss}
  >
    {children}
  </div>
);

// Provider
// ==============================

export class ToastProvider extends Component {
  state = {
    notification: undefined,
  };

  handleSetMessage = notification => {
    this.setState({
      notification,
    });
  };

  render() {
    const context = {
      add: this.add,
      remove: this.remove,
    };

    return (
      <Provider value={context}>
        {this.props.children}
        <ToastContainer>
          <Toast notification={this.notification} handleSetMessage={this.handleSetMessage} />
        </ToastContainer>
      </Provider>
    );
  }
}

// Consumer
// ==============================

export const ToastConsumer = ({ children }) => <Consumer>{context => children(context)}</Consumer>;

export const withToastManager = Comp => props => (
  <ToastConsumer>{context => <Comp toastManager={context} {...props} />}</ToastConsumer>
);
