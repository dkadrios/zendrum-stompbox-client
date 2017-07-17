import { RECEIVED_ALL_TRIMS } from '../actions';
import { createReducer } from '../utils';

const receivedAllTrims = (state, { payload }) => ({
  ...state,
  data: [...payload],
});

const handlers = {
  [RECEIVED_ALL_TRIMS]: receivedAllTrims,
};

export default createReducer({
  sortBy: 'idx',
  showNames: true,
  data: [],
}, handlers);
