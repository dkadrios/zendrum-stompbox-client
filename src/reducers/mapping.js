import PropTypes from 'prop-types'
import { createReducer } from '../utils'
import { LOAD_MAPPING } from '../action-creators/actions'

const loadMapping = (state, { name, entries }) => ({
  ...state,
  name,
  entries: [...entries],
})

const handlers = {
  [LOAD_MAPPING]: loadMapping,
}

const defaultState = {
  name: '',
  entries: [],
  available: [
    { name: 'stompblock', label: 'STOMPBLOCK' },
    { name: 'emrichNumber1', label: 'John Emrich - Articulations #1' },
  ],
}

export const mappingShape = {
  note: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  group: PropTypes.string.isRequired,
}

export default createReducer(defaultState, handlers)
