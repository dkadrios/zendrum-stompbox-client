import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './views/App';
import storeFactory from './store';
import { getMidiDevices } from './action-creators/midiDevices';

/* eslint-disable no-underscore-dangle */
const store = storeFactory({});
/* eslint-enable no-underscore-dangle */

class Root extends Component {
  componentDidMount() {
    store.dispatch(getMidiDevices());
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default Root;
