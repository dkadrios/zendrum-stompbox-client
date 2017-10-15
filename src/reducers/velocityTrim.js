import { createReducer } from '../utils'
import {
  RECEIVED_ALL_TRIMS,
  USER_CHANGED_TRIM,
  USER_CHANGED_TRIM_END,
  SEARCH_TRIMS,
  SELECT_TRIM,
  CHANGE_GROUP,
  CHANGE_LIST_VIEW,
  LOAD_MAPPING,
} from '../action-creators/actions'

const receivedAllTrims = (state, { incomingTrims }) => ({
  ...state,
  data: state.data.map((item, idx) => ({ ...item, trim: incomingTrims[idx + 1] })),
})

const userChangedTrim = (state, { noteNum, value }) => ({
  ...state,
  data: state.data.map((
    item,
    idx, //-
  ) => (idx === noteNum - 1 ? { ...item, trim: value } : { ...item })),
})

const searchTrims = (state, { search }) => ({
  ...state,
  search,
})

const selectTrim = (state, { selectedNoteNum }) => ({
  ...state,
  selectedNoteNum,
})

const changeGroup = (state, { group }) => ({
  ...state,
  group,
})

const changeListView = (state, { listView }) => ({
  ...state,
  listView,
})

const loadMapping = (state, { entries }) => ({
  ...state,
  data: state.data.map((item, idx) => ({ ...item, ...entries[idx] })),
})

const initialTrims = () =>
  Array(126)
    .fill(0)
    .map((item, idx) => ({
      note: idx + 1,
      name: '',
      group: '',
      trim: 0,
    }))

const handlers = {
  [RECEIVED_ALL_TRIMS]: receivedAllTrims,
  [USER_CHANGED_TRIM]: userChangedTrim,
  [USER_CHANGED_TRIM_END]: userChangedTrim,
  [SEARCH_TRIMS]: searchTrims,
  [SELECT_TRIM]: selectTrim,
  [CHANGE_GROUP]: changeGroup,
  [CHANGE_LIST_VIEW]: changeListView,
  [LOAD_MAPPING]: loadMapping,
}

const defaultState = {
  sortBy: 'idx',
  showNames: true,
  search: '',
  group: 'all',
  listView: 'medium',
  selectedNoteNum: NaN,
  data: initialTrims(),
}

export default createReducer(defaultState, handlers)
