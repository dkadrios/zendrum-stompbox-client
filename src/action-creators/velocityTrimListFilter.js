import {
  SEARCH_TRIMS,
  SELECT_TRIM,
  CHANGE_GROUP,
  CHANGE_LIST_VIEW,
  CHANGE_CHASE_ENABLED,
} from './actions'

export const searchTrims = (search) => {
  localStorage.setItem('search', search)
  return {
    type: SEARCH_TRIMS,
    search,
  }
}

export const selectTrim = selectedNoteNum => ({
  type: SELECT_TRIM,
  selectedNoteNum,
})

export const changeGroup = (group) => {
  localStorage.setItem('group', group)
  return {
    type: CHANGE_GROUP,
    group,
  }
}

export const changeListView = (listView) => {
  localStorage.setItem('listView', listView)
  return {
    type: CHANGE_LIST_VIEW,
    listView,
  }
}

export const setChaseEnabled = (chaseEnabled) => {
  localStorage.setItem('chaseEnabled', chaseEnabled)
  return {
    type: CHANGE_CHASE_ENABLED,
    chaseEnabled,
  }
}
