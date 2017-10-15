export function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    return Object.prototype.hasOwnProperty.call(handlers, action.type)
      ? handlers[action.type](state, action)
      : state
  }
}

export default createReducer
