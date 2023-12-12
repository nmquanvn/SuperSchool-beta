import React from 'react';
import { Route, Switch } from 'react-router-dom';
import indexRoutes from './routes/index.jsx';
import './assets/scss/material-dashboard-pro-react.css';
import PrivateRoute from './routes/privateRoute.jsx';

function CMS() {
  return (
    <Switch>
      {indexRoutes.map((prop, key) => {
        if (prop.private) {
          return (
            <PrivateRoute
              path={prop.path}
              component={prop.component}
              key={key}
            />
          );
        } else {
          return (
            <Route path={prop.path} component={prop.component} key={key} />
          );
        }
      })}
    </Switch>
  );
}

export default CMS;
