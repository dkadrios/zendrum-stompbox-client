/* --------------------------- Reducers ------------------------------------- */

export function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    return Object.prototype.hasOwnProperty.call(handlers, action.type)
      ? handlers[action.type](state, action)
      : state
  }
}

/* ---------------------------- Arrays -------------------------------------- */

// this just creates and fills a zero-indexed array array; 0, 1, 2, 3, etc
export const arraySequence = numberOfElements =>
  Array(...{ length: numberOfElements }).map(Function.call, Number)

/* ------------------------ redux-form Validators --------------------------- */

export const fieldRequired = value => (value ? undefined : 'Required')
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
export const fieldMaxLength64 = maxLength(64)
export const fieldEmail = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined

/* -------------------------------- misc ------------------------------------ */

export const getSetting = (key, defaultValue) => {
  const value = localStorage.getItem(key)
  if (value !== null) {
    if (typeof defaultValue === 'boolean') {
      return value === 'true'
    }
    return value
  }
  return defaultValue
}
