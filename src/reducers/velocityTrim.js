import { RECEIVED_ALL_TRIMS } from '../actions';
import { createReducer } from '../utils';
import stompblock from '../stompblock';

const receivedAllTrims = (state, { payload }) => ({
  ...state,
  data: state.data.map((item, idx) => ({ ...item, trim: payload[idx] })),
});

const handlers = {
  [RECEIVED_ALL_TRIMS]: receivedAllTrims,
};

const formattedMap = () => stompblock.map((item) => {
  const props = /(\d+):([\w\s]+)\|([\w\s]+)/.exec(item);

  return {
    note: parseInt(props[1], 10),
    group: props[2],
    name: props[3],
    trim: 0,
  };
});

export default createReducer({
  sortBy: 'idx',
  showNames: true,
  data: formattedMap(),
}, handlers);
