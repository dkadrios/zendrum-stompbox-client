import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import setup from 'redux-midi';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { watchForDeviceChange, sysexMiddleware } from './midi';

const logger = createLogger();
let middlewares = [thunk];

/* global __DEV__ */
export default function storeFactory(initialState = {}, debug = __DEV__, test = false) {
  if (!test) {
    const { inputMiddleware, outputMiddleware } = setup({ midiOptions: { sysex: true } });
    middlewares = [...middlewares, inputMiddleware, outputMiddleware, sysexMiddleware];
  }

  const store = (
    debug
      ? compose(
          applyMiddleware(...middlewares),
          applyMiddleware(logger),
          window.devToolsExtension
            ? window.devToolsExtension()
            : f => f)
      : applyMiddleware(...middlewares)
  )(createStore)(rootReducer, initialState);

  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      // eslint-disable-next-line
      const nextRootReducer = require('./reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }

  if (!test) {
    watchForDeviceChange(store);
  }

  return store;
}
