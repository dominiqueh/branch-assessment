import { Switch, Route } from 'react-router-dom';
import React from 'react';

import UsersList from '../pages/UsersList';
import UserDetails from '../pages/UserDetails';

const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={UsersList} />
      <Route exact path="/details/:userId" component={UserDetails} />
    </Switch>
  </div>
);

export default App;
