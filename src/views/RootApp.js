import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound404 from '../views/NotFound404';
// import { Test } from './containers'
import App from '../views/App';
import '../styles/app.scss';

const RootApp = () =>
  (<Switch>
    {/* <Route exact path="/:id" component={Test} />*/}
    <Route
      path="/"
      component={() => (
        <div className="app">
          <p>hi there</p>
          <Switch>
            <Route exact path="/" component={App} />
            {/* <Route path="/sort/:sort" component={Test} />*/}
            <Route component={NotFound404} />
          </Switch>
        </div>
      )}
    />
  </Switch>);

export default RootApp;
