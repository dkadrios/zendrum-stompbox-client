/* @flow */
import type { Action } from './types/Action'

type Reducer<S, A: Action> = (S, A) => S

/* eslint-disable no-prototype-builtins */
/* eslint-disable import/prefer-default-export */
/* eslint-disable max-len  */
export function createReducer<S, A: *>(
  initialState: S,
  handlers: { [key: string]: Reducer<S, A> },
): Reducer<S, A> {
  return function reducer(state: S = initialState, action: A): S {
    return handlers.hasOwnProperty(action.type) ? handlers[action.type](state, action) : state
  }
}
