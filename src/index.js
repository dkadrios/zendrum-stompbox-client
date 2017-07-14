import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import RootApp from './views/RootApp'
import storeFactory from './store'

const store = storeFactory(false, window.__INITIAL_STATE__)

window.React = React
window.store = store

console.log('rendered from here...')

render(
  <Provider store={store}>
    <BrowserRouter>
      <RootApp />
    </BrowserRouter>
  </Provider>,
  document.getElementById('react-container')
)
