import stompblockMapping from '../mappings/stompblock'
import enrich1Mapping from '../mappings/emrichNumber1'
import { LOAD_MAPPING, IMPORT_MAPPING, DELETE_MAPPING, REPORT_ERROR } from './actions'
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

const removeMapping = (name) => {
  const mappings = loadMappings()
  delete mappings[name]
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
  try {
    storeMapping(name, contents)
  } catch (E) {
    dispatch({ type: REPORT_ERROR, errorMessage: 'Unable to import.  Not a valid map file.' })
    return
  }

  dispatch({ type: IMPORT_MAPPING, name })
}

export const deleteMapping = name => (dispatch) => {
  removeMapping(name)

  dispatch({ type: DELETE_MAPPING, name })

  // Cause both banks to reload to reset default in case this mapping was selected
  dispatch(loadMapping(0))
  dispatch(loadMapping(1))
}
