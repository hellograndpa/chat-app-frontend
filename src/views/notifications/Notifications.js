import React, { Component } from 'react';
import { withNotification } from '../../Context/NotificationCtx';

class Notifications extends Component {
  render() {
    const { notification, status, handleCloseMessage } = this.props;
    return (
      <>
        {status && (
          <div className={notification.typeMessage}>
            {notification.typeMessage}: {notification.message}
            <button onClick={handleCloseMessage}>close</button>
          </div>
        )}
      </>
    );
  }
}

export default withNotification(Notifications);
