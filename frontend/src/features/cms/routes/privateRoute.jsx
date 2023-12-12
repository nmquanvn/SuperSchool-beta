import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLogin = useSelector(({ userReducer }) => userReducer?.isLogin);
  console.log('LoginL', isLogin);
  return (
    // Show the component only when the user is logged in
    <Route
      {...rest}
      render={(props) =>
        isLogin ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PrivateRoute;
