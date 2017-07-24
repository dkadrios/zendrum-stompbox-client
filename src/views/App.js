import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainInterface from './MainInterface';
import NotFound404 from './NotFound404';
import styles from '../styles/app';

const App = () =>
  (<Switch>
    <Route
      path="/"
      component={() => (
        <div className={styles.app}>
          <Switch>
            <Route exact path="/" component={MainInterface} />
            <Route exact path="/stompblock" component={MainInterface} />
            <Route exact path="/stompblock/" component={MainInterface} />
            <Route component={NotFound404} />
          </Switch>
        </div>
      )}
    />
  </Switch>);

export default App;
