import { applyMiddleware, compose, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import setup from 'redux-midi-fork'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import sysexInputMiddleware from './middleware/sysexInput'
import sysexOutputMiddleware from './middleware/sysexOutput'
import { watchForDeviceChange } from './midi/'

const logger = createLogger()
let middlewares = [thunk]

export default function storeFactory(initialState = {}, debug = __DEV__, test = __TEST__) {
  /* istanbul ignore next */
  if (!test) {
    const { inputMiddleware, outputMiddleware } = setup({ midiOptions: { sysex: true } })
    middlewares = [
      ...middlewares,
      inputMiddleware,
      outputMiddleware,
      sysexInputMiddleware,
      sysexOutputMiddleware,
    ]
  }

  /* eslint-disable indent */
  const store = (debug
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
    /*
    * This effectively bootstraps the application.
    *
    * Whenever our device is detected, either initially or due to being
    * plugged in, watchForDeviceChange will dispatch stompblockFound().
    * This action is intercepted in /middleware/sysexInput, which then
    * dispatches additional events to request the internal state of the
    * device.
    */
    watchForDeviceChange(store)
  }

  return store
}
