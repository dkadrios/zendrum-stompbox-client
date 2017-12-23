import PropTypes from 'prop-types'
import { createReducer } from '../utils'
import { LOAD_MAPPING } from '../action-creators/actions'

const loadMapping = (state, { name, entries, bank }) => ({
  ...state,
  banks: {
    ...state.banks,
    [bank]: {
      name,
      entries: [...entries],
    },
  },
})

const handlers = {
  [LOAD_MAPPING]: loadMapping,
}

const defaultState = {
  banks: {
    0: {
      name: '',
      entries: [],
    },
    1: {
      name: '',
      entries: [],
    },
  },
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

const bankShape = {
  name: PropTypes.string.isRequired,
  entries: PropTypes.arrayOf(PropTypes.shape(mappingShape)).isRequired,
}

const banksShape = {
  0: PropTypes.shape(bankShape).isRequired,
  1: PropTypes.shape(bankShape).isRequired,
}

export const mappingsShape = {
  banks: PropTypes.shape(banksShape).isRequired,
  available: PropTypes.array.isRequired,
}

export default createReducer(defaultState, handlers)
