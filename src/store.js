import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const logger = createLogger();

const middlewares = [thunk];

/* global __DEV__ */
export default function configureStore(initialState = {}, debug = __DEV__) {
  const createStoreWithMiddleware = applyMiddleware(...middlewares);

  const store = (debug ?
    compose(
      createStoreWithMiddleware,
      applyMiddleware(logger),
      window.devToolsExtension ? window.devToolsExtension() : f => f)
    : createStoreWithMiddleware
  )(createStore)(rootReducer, initialState);

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      // eslint-disable-next-line
      const nextRootReducer = require('./reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
