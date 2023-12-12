import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Search from './components/Search';
const NotFoundPage = React.lazy(() => import('@components/NotFound'));

function SearchPage() {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route exact path={match.url} component={Search} />
      <Route exact path={`${match.url}/keyword=:keyword?`} component={Search} />
      <Route component={NotFoundPage} />
    </Switch>
  );
}

export default SearchPage;
