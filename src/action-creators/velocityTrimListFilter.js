/* @flow */

import type { Action } from '../types/Action'
import type { GroupName } from '../types/Mappings'
import type { ListView } from '../types/VelocityTrimList'

export const searchTrims = (text: string): Action => ({
  type: 'SEARCH_TRIMS',
  payload: text,
})

export const selectTrim = (noteNum: number): Action => ({
  type: 'SELECT_TRIM',
  payload: noteNum,
})

export const changeGroup = (group: GroupName): Action => ({
  type: 'CHANGE_GROUP',
  payload: group,
})

export const changeListView = (view: ListView): Action => ({
  type: 'CHANGE_LIST_VIEW',
  payload: view,
})
