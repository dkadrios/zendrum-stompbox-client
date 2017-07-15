import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import RootApp from './views/RootApp';
import storeFactory from './store';

/* eslint-disable no-underscore-dangle */
const store = storeFactory({});
/* eslint-enable no-underscore-dangle */

class Root extends Component {
  componentDidMount() {
    // TODO: Launch Web MIDI
    console.log('rendered from here...!'); // eslint-disable-line
  }

  render() {
    return (
      <div>
        <Provider store={store}>
          <BrowserRouter>
            <RootApp />
          </BrowserRouter>
        </Provider>
      </div>
    );
  }
}

export default Root;
