import { createReducer } from '../utils'

const loadMapping = (state, { name, entries }) => ({
  ...state,
  name,
  entries: [...entries],
})

const handlers = {
  LOAD_MAPPING: loadMapping,
}

const defaultState = {
  name: '',
  entries: [],
  available: [
    { name: 'stompblock', label: 'STOMPBLOCK' },
    { name: 'emrichNumber1', label: 'John Emrich - Articulations #1' },
  ],
}

export default createReducer(defaultState, handlers)
