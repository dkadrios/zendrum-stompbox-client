import stompblockMapping from '../mappings/stompblock'
import enrich1Mapping from '../mappings/emrichNumber1'
import { LOAD_MAPPING } from './actions'

export const loadMapping = () => {
  /* istanbul ignore next */
  const name = localStorage.getItem('mapping') || 'stompblock'
  let entries

  switch (name) {
    case 'stompblock':
      entries = stompblockMapping
      break
    case 'emrichNumber1':
      entries = enrich1Mapping
      break
    /* istanbul ignore next */
    default:
      entries = stompblockMapping
  }

  return {
    type: LOAD_MAPPING,
    name,
    entries,
  }
}

export const selectMapping = name => (dispatch) => {
  localStorage.setItem('mapping', name)
  dispatch(loadMapping())
}
