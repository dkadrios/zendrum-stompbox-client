import { SEARCH_TRIMS, SELECT_TRIM, CHANGE_GROUP, CHANGE_LIST_VIEW } from './actions'

export const searchTrims = text => ({
  type: SEARCH_TRIMS,
  payload: text,
})

export const selectTrim = noteNum => ({
  type: SELECT_TRIM,
  payload: noteNum,
})

export const changeGroup = group => ({
  type: CHANGE_GROUP,
  payload: group,
})

export const changeListView = view => ({
  type: CHANGE_LIST_VIEW,
  payload: view,
})
