import stompblockMapping from '../mappings/stompblock'
import enrich1Mapping from '../mappings/emrichNumber1'
import { LOAD_MAPPING, IMPORT_MAPPING } from './actions'
import mapper from '../mappings/mapper'

export const loadMappings = () => JSON.parse(localStorage.getItem('mappings'))

const storeMappings = (mappings) => {
  localStorage.setItem('mappings', JSON.stringify(mappings))
}

const storeMapping = (name, content) => {
  const mappings = loadMappings()
  mappings[name] = mapper(content)
  storeMappings(mappings)
}

export const assertMappingsInStorage = () => {
  if (localStorage.getItem('mappings') === null) {
    storeMappings({
      stompblock: [...stompblockMapping],
      emrichNumber1: [...enrich1Mapping],
    })
  }
}

export const loadMapping = (bank) => {
  /* istanbul ignore next */
  let name = localStorage.getItem(`mapping${bank}`) || 'stompblock'
  const mappings = loadMappings()

  let entries

  if (mappings[name]) {
    entries = mappings[name]
  } else {
    // Mapping was probably deleted.  Default to stompblock
    entries = [...stompblockMapping]
    name = 'stompblock'
    localStorage.setItem(`mapping${bank}`, name)
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

export const importMapping = (name, contents) => (dispatch) => {
  storeMapping(name, contents)

  dispatch({ type: IMPORT_MAPPING, name })
}
