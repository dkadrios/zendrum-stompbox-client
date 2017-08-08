import {
  RECEIVED_ALL_TRIMS,
  USER_CHANGED_TRIM,
  USER_CHANGED_TRIM_END,
  SEARCH_TRIMS,
  SELECT_TRIM,
  CHANGE_GROUP,
  CHANGE_LIST_VIEW,
} from '../actions'
import { createReducer } from '../utils'
import stompblockMapping from '../mappings/stompblock'

const receivedAllTrims = (state, { payload }) => ({
  ...state,
  data: state.data.map((item, idx) => ({ ...item, trim: payload[idx + 1] })),
})

const userChangedTrim = (state, { payload: { noteNum, value } }) => ({
  ...state,
  data: state.data.map((item, idx) => (
    idx === (noteNum - 1)
      ? { ...item, trim: value }
      : { ...item }
  )),
})

const searchTrims = (state, { payload }) => ({
  ...state,
  search: payload,
})

const selectTrim = (state, { payload }) => ({
  ...state,
  selectedNoteNum: payload,
})

const changeGroup = (state, { payload }) => ({
  ...state,
  group: payload,
})

const changeListView = (state, { payload }) => ({
  ...state,
  listView: payload,
})

const handlers = {
  [RECEIVED_ALL_TRIMS]: receivedAllTrims,
  [USER_CHANGED_TRIM]: userChangedTrim,
  [USER_CHANGED_TRIM_END]: userChangedTrim,
  [SEARCH_TRIMS]: searchTrims,
  [SELECT_TRIM]: selectTrim,
  [CHANGE_GROUP]: changeGroup,
  [CHANGE_LIST_VIEW]: changeListView,
}

export default createReducer({
  sortBy: 'idx',
  showNames: true,
  search: '',
  group: 'all',
  listView: 'medium',
  selectedNoteNum: NaN,
  data: stompblockMapping,
}, handlers)
