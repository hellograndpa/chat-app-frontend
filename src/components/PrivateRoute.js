import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withAuth } from '../Context/AuthContext';
import NavBar from '../views/nav/NavBar';

function PrivateRoute({ component: Comp, isLoggedin, user, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedin ? (
          <>
            <Comp {...props} />
            <NavBar />
          </>
        ) : (
          <Redirect
            to={{
              pathname: '/',
            }}
          />
        )
      }
    />
  );
}

export default withAuth(PrivateRoute);
