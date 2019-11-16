import React, { Component } from 'react';
import { withNotification } from '../../Context/NotificationCtx';

class Notifications extends Component {
  render() {
    const { notification, status, handleCloseMessage } = this.props;
    return (
      <>
        <div
          className={
            status ? `notifications ${notification.typeMessage}` : `notifications ${notification.typeMessage} hidden`
          }
          onClick={handleCloseMessage}
        >
          <div>{notification.message}</div>
        </div>
      </>
    );
  }
}

export default withNotification(Notifications);
