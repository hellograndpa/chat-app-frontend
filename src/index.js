import React from 'react';
import ReactDOM from 'react-dom';
import { Beforeunload } from 'react-beforeunload';
import AuthProvider from './Context/AuthContext';
import NotificationProvider from './Context/NotificationCtx';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './css/main.scss';

ReactDOM.render(
  <Beforeunload onBeforeunload={() => "You'll lose your data!"}>
    <AuthProvider>
      <NotificationProvider>
        <App />
      </NotificationProvider>
    </AuthProvider>
  </Beforeunload>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
