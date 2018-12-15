/* --------------------------- Reducers ------------------------------------- */

export function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    return Object.prototype.hasOwnProperty.call(handlers, action.type) ? handlers[action.type](state, action) : state
  }
}

/* ---------------------------- Arrays -------------------------------------- */

export const arraySequence = numberOfElements => Array.from(Array(numberOfElements).keys())

// Breaks an array up into chunks of a given size (e.g. converts to 2 dimensions)
export const partitionArray = (array, size) => array //
  .map((item, idx) => (idx % size === 0 ? array.slice(idx, idx + size) : null))
  .filter(e => e)

/* ------------------------ redux-form Validators --------------------------- */

export const fieldRequired = value => (value ? undefined : 'Required')
const maxLength = max => value => (value && value.length > max ? `Must be ${max} characters or less` : undefined)
export const fieldMaxLength64 = maxLength(64)
export const fieldEmail = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined

/* -------------------------------- misc ------------------------------------ */

export const getSetting = (key, defaultValue) => {
  const value = localStorage.getItem(key)
  if (value !== null) {
    switch (typeof defaultValue) {
      case 'boolean':
        return value === 'true'
      case 'number':
        return parseInt(value, 10)
      default:
        return value
    }
  }
  return defaultValue
}
