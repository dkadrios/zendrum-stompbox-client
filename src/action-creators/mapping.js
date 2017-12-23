import stompblockMapping from '../mappings/stompblock'
import enrich1Mapping from '../mappings/emrichNumber1'
import { LOAD_MAPPING } from './actions'

export const loadMapping = (bank) => {
  /* istanbul ignore next */
  const name = localStorage.getItem(`mapping${bank}`) || 'stompblock'
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
    bank,
  }
}

export const selectMapping = (name, bank) => (dispatch) => {
  localStorage.setItem(`mapping${bank}`, name)
  dispatch(loadMapping(bank))
}
