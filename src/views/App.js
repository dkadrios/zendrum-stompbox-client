import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Menu from './Menu';
import MidiDevices from './MidiDevices';
import NotFound404 from './NotFound404';
import styles from '../styles/app';

const App = () =>
  (<Switch>
    {/* <Route exact path="/:id" component={Test} />*/}
    <Route
      path="/"
      component={() => (
        <div className={styles.layout}>
          <Route component={Menu} />
          <Switch>
            <Route exact path="/" component={MidiDevices} />
            {/* <Route path="/sort/:sort" component={Test} />*/}
            <Route component={NotFound404} />
          </Switch>
        </div>
      )}
    />
  </Switch>);

export default App;
