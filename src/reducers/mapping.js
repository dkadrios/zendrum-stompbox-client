import PropTypes from 'prop-types'
import { createReducer } from '../utils'
import { LOAD_MAPPING, IMPORT_MAPPING, DELETE_MAPPING } from '../action-creators/actions'
import { loadMappings, assertMappingsInStorage } from '../action-creators/mapping'

const availableMappings = () => {
  assertMappingsInStorage()

  const keys = Object.keys(loadMappings())

  return keys.map((name) => {
    let label
    switch (name) {
      case 'stompblock':
        label = 'STOMPBLOCK'
        break
      case 'emrichNumber1':
        label = 'John Emrich - Articulations #1'
        break
      default:
        label = name
    }
    return { name, label }
  })
}

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

const importMapping = (state, { name }) => ({
  ...state,
  available: [...state.available, { name, label: name }],
})

const deleteMapping = (state, { name }) => ({
  ...state,
  available: state.available.filter(item => item.name !== name),
})

const handlers = {
  [LOAD_MAPPING]: loadMapping,
  [IMPORT_MAPPING]: importMapping,
  [DELETE_MAPPING]: deleteMapping,
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
  available: availableMappings(),
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
