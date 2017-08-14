/* @flow */

import { createReducer } from '../utils'
import stompblockMapping from '../mappings/stompblock'
import type { GroupName, MappingEntry } from '../types/Mappings'
import type {
  ReceivedVelocityTrimsAction,
  UserChangedTrimAction,
  SearchTrimsAction,
  SelectTrimAction,
  ChangeGroupAction,
  ChangeListViewAction,
} from '../types/Action'
import type { ListView } from '../types/VelocityTrimList'

export type TrimsState = {
  +sortBy: 'idx',
  +showNames: boolean,
  +search: string,
  +group: GroupName | 'all',
  +listView: ListView,
  +selectedNoteNum: number,
  +data: Array<MappingEntry>,
}

const receivedAllTrims = (
  state: TrimsState,
  { payload }: ReceivedVelocityTrimsAction,
): TrimsState => ({
  ...state,
  data: state.data.map((item, idx) => ({ ...item, trim: payload[idx + 1] })),
})

const userChangedTrim = (
  state: TrimsState,
  { payload: { noteNum, value } }: UserChangedTrimAction,
): TrimsState => ({
  ...state,
  data: state.data.map(
    (item, idx) => (idx === noteNum - 1 ? { ...item, trim: value } : { ...item }),
  ),
})

const searchTrims = (state: TrimsState, { payload }: SearchTrimsAction): TrimsState => ({
  ...state,
  search: payload,
})

const selectTrim = (state: TrimsState, { payload }: SelectTrimAction): TrimsState => ({
  ...state,
  selectedNoteNum: payload,
})

const changeGroup = (state: TrimsState, { payload }: ChangeGroupAction): TrimsState => ({
  ...state,
  group: payload,
})

const changeListView = (state: TrimsState, { payload }: ChangeListViewAction): TrimsState => ({
  ...state,
  listView: payload,
})

const handlers = {
  RECEIVED_ALL_TRIMS: receivedAllTrims,
  USER_CHANGED_TRIM: userChangedTrim,
  USER_CHANGED_TRIM_END: userChangedTrim,
  SEARCH_TRIMS: searchTrims,
  SELECT_TRIM: selectTrim,
  CHANGE_GROUP: changeGroup,
  CHANGE_LIST_VIEW: changeListView,
}

const defaultState: TrimsState = {
  sortBy: 'idx',
  showNames: true,
  search: '',
  group: 'all',
  listView: 'medium',
  selectedNoteNum: NaN,
  data: stompblockMapping,
}

export default createReducer(defaultState, handlers)
