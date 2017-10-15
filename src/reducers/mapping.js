/* @flow */

import { createReducer } from '../utils'

import type { ArrayOfMappingEntries } from '../types/Mappings'

import type { LoadMappingAction } from '../types/Action'

export type MappingState = {
  +name: string,
  +entries: ArrayOfMappingEntries,
  +available: Array<any>,
}

const loadMapping = (state: MappingState, { name, entries }: LoadMappingAction): MappingState => ({
  ...state,
  name,
  entries: [...entries],
})

const handlers = {
  LOAD_MAPPING: loadMapping,
}

const defaultState: MappingState = {
  name: '',
  entries: [],
  available: [
    { name: 'stompblock', label: 'STOMPBLOCK' },
    { name: 'emrichNumber1', label: 'John Emrich - Articulations #1' },
  ],
}

export default createReducer(defaultState, handlers)
