/* @flow */
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './views/App'
import storeFactory from './store'

import type { Store } from './types/Store'

const store: Store = storeFactory({})

const Root = () =>
  (<Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>)

export default Root
