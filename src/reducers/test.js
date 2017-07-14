import { TEST } from '../actions';
import { createReducer } from '../utils';

const testHandler = (state, { payload }) => ({ ...state, ...payload });

const handlers = {
  [TEST]: testHandler,
};

export default createReducer({}, handlers);
