import {
  RECEIVED_ALL_TRIMS,
  USED_CHANGED_TRIM,
  USED_CHANGED_TRIM_END,
  SEARCH_TRIMS,
  CHANGE_GROUP,
  CHANGE_LIST_VIEW,
} from '../actions';
import { createReducer } from '../utils';
import stompblock from '../stompblock';

const receivedAllTrims = (state, { payload }) => ({
  ...state,
  data: state.data.map((item, idx) => ({ ...item, trim: payload[idx + 1] })),
});

const userChangedTrim = (state, { payload: { noteNum, value } }) => ({
  ...state,
  data: state.data.map((item, idx) => (
    idx === (noteNum - 1)
      ? { ...item, trim: value }
      : { ...item }
  )),
});

const searchTrims = (state, { payload }) => ({
  ...state,
  search: payload,
});

const changeGroup = (state, { payload }) => ({
  ...state,
  group: payload,
});

const changeListView = (state, { payload }) => ({
  ...state,
  listView: payload,
});

const formattedMap = () => stompblock.map((item) => {
  const props = /(\d+):([\w\s]+)\|([\w\s]+)/.exec(item);

  return {
    note: parseInt(props[1], 10),
    group: props[2],
    name: props[3],
    trim: 0,
  };
});

const handlers = {
  [RECEIVED_ALL_TRIMS]: receivedAllTrims,
  [USED_CHANGED_TRIM]: userChangedTrim,
  [USED_CHANGED_TRIM_END]: userChangedTrim,
  [SEARCH_TRIMS]: searchTrims,
  [CHANGE_GROUP]: changeGroup,
  [CHANGE_LIST_VIEW]: changeListView,
};

export default createReducer({
  sortBy: 'idx',
  showNames: true,
  search: '',
  group: 'all',
  listView: 'medium',
  data: formattedMap(),
}, handlers);
