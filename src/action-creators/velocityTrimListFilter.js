import { SEARCH_TRIMS, SELECT_TRIM, CHANGE_GROUP, CHANGE_LIST_VIEW } from './actions'

export const searchTrims = search => ({
  type: SEARCH_TRIMS,
  search,
})

export const selectTrim = selectedNoteNum => ({
  type: SELECT_TRIM,
  selectedNoteNum,
})

export const changeGroup = group => ({
  type: CHANGE_GROUP,
  group,
})

export const changeListView = listView => ({
  type: CHANGE_LIST_VIEW,
  listView,
})
