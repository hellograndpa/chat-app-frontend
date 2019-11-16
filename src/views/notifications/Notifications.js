import React, { Component } from 'react';
import { withNotification } from '../../Context/NotificationCtx';

class Notifications extends Component {
  render() {
    const { notification, status, handleCloseMessage } = this.props;
    return (
      <>
        <div className={status ? 'notifications' : 'notifications hidden'} onClick={handleCloseMessage}>
          <div className={notification.typeMessage}>
            {notification.typeMessage}: {notification.message}
          </div>
        </div>
      </>
    );
  }
}

export default withNotification(Notifications);
