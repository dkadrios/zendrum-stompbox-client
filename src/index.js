import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import RootApp from './views/RootApp';
import storeFactory from './store';

/* eslint-disable no-underscore-dangle */
const store = storeFactory(false, window.__INITIAL_STATE__);
/* eslint-enable no-underscore-dangle */

window.React = React;
window.store = store;

console.log('rendered from here...'); // eslint-disable-line

render(
  <Provider store={store}>
    <BrowserRouter>
      <RootApp />
    </BrowserRouter>
  </Provider>,
  document.getElementById('react-container'),
);
