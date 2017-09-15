/* @flow */
import { applyMiddleware, compose, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import setup from 'redux-midi'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import { watchForDeviceChange, sysexMiddleware } from './midi'

import type { Store } from './types/Store'

const logger = createLogger()
let middlewares = [thunk]

export default function storeFactory(
  initialState: * = {},
  debug: boolean = __DEV__,
  test: boolean = __TEST__,
): Store {
  /* istanbul ignore next */
  if (!test) {
    const { inputMiddleware, outputMiddleware } = setup({ midiOptions: { sysex: true } })
    middlewares = [...middlewares, inputMiddleware, outputMiddleware, sysexMiddleware]
  }

  /* eslint-disable indent */
  const store: Store = (debug
    ? compose(
        applyMiddleware(...middlewares),
        applyMiddleware(logger),
        window.devToolsExtension
          ? /* istanbul ignore next */
            window.devToolsExtension()
          : f => f,
      )
    : applyMiddleware(...middlewares))(createStore)(rootReducer, initialState)
  /* eslint-enable indent */

  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      // eslint-disable-next-line
      const nextRootReducer = require('./reducers/index')
      store.replaceReducer(nextRootReducer)
    })
  }

  /* istanbul ignore next */
  if (!test) {
    watchForDeviceChange(store)
  }

  return store
}
