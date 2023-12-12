import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ children, ...rest }) {
  const renderChildren = function () {
    return localStorage.token ? children : <Redirect to="/login" />;
  };

  return <Route {...rest} render={renderChildren} />;
}
export default PrivateRoute;
