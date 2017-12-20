import PropTypes from 'prop-types'
import { createReducer, getSetting } from '../utils'
import {
  RECEIVED_ALL_TRIMS,
  USER_CHANGED_TRIM,
  USER_CHANGED_TRIM_END,
  SEARCH_TRIMS,
  SELECT_TRIM,
  CHANGE_GROUP,
  CHANGE_LIST_VIEW,
  LOAD_MAPPING,
  CHANGE_CHASE_ENABLED,
  NOTE_PLAYED,
  RECEIVED_VERSION,
} from '../action-creators/actions'

const receivedVersion = (state, { anvil }) => ({
  ...state,
  hasSoundBankSupport: anvil >= 30,
})

const receivedAllTrims = (state, { incomingTrims, bank }) => {
  const newState = { ...state }

  if (bank === 0) {
    newState.data = state.data.map((item, idx) => ({
      ...item,
      // Older units have trims stored with an offset of 1
      trim: incomingTrims[idx + (state.hasSoundBankSupport ? 1 : 0)],
    }))
  } else if (__DEV__) {
    console.log('Bank B not supported yet.') // eslint-disable-line
  }

  return newState
}

// TODO: integrate bank
const userChangedTrim = (state, { noteNum, value /* , bank */ }) => ({
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

const changeChaseEnabled = (state, { chaseEnabled }) => ({
  ...state,
  chaseEnabled,
})

const notePlayed = (
  state,
  { noteNum, bank }, // In the future we may want to select the bank too
) =>
  state.chaseEnabled && bank === state.bank
    ? selectTrim(state, { selectedNoteNum: noteNum })
    : { ...state }

const initialTrims = () =>
  Array(126)
    .fill(0)
    .map((item, idx) => ({
      note: idx + 1,
      name: '---',
      group: 'Loading...',
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
  [CHANGE_CHASE_ENABLED]: changeChaseEnabled,
  [LOAD_MAPPING]: loadMapping,
  [NOTE_PLAYED]: notePlayed,
  [RECEIVED_VERSION]: receivedVersion,
}

/* We used to have a 'narrow' option.  Default to 'wide' if this
is what the user had previously selected */
const getInitialListView = () => {
  const result = getSetting('listView', 'list')
  return result === 'narrow' ? 'wide' : result
}

const defaultState = {
  sortBy: 'idx',
  showNames: true,
  search: getSetting('search', ''),
  group: getSetting('group', 'all'),
  listView: getInitialListView(),
  selectedNoteNum: NaN,
  data: initialTrims(),
  bank: 0,
  chaseEnabled: getSetting('chaseEnabled', true),
  hasSoundBankSupport: false,
}

export const trimShape = PropTypes.shape({
  note: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  group: PropTypes.string.isRequired,
  trim: PropTypes.number.isRequired,
})

export const velocityTrimShape = PropTypes.shape({
  sortBy: PropTypes.oneOf(['idx']).isRequired, // might expand on this later
  showNames: PropTypes.bool.isRequired,
  search: PropTypes.string.isRequired,
  group: PropTypes.string.isRequired, // PropTypes.oneOf([]),
  listView: PropTypes.oneOf(['list', 'medium', 'wide']).isRequired,
  selectedNoteNum: PropTypes.number,
  data: PropTypes.arrayOf(trimShape).isRequired,
  bank: PropTypes.number.isRequired,
  chaseEnabled: PropTypes.bool.isRequired,
  hasSoundBankSupport: PropTypes.bool.isRequired,
})

export default createReducer(defaultState, handlers)
