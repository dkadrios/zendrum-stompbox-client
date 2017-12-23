import deepFreeze from 'deep-freeze'
import stompblock from '../../src/mappings/stompblock'
import velocityTrim from '../../src/reducers/velocityTrim'

import {
  SEARCH_TRIMS,
  RECEIVED_ALL_TRIMS,
  USER_CHANGED_TRIM,
  USER_CHANGED_TRIM_END,
  SELECT_TRIM,
  CHANGE_GROUP,
  CHANGE_LIST_VIEW,
  LOAD_MAPPING,
} from '../../src/action-creators/actions'

describe('velocityTrim reducer', () => {
  const initialState = {
    sortBy: 'idx',
    showNames: true,
    search: '',
    group: 'all',
    listView: 'medium',
    selectedNoteNum: 42,
    bank: 0,
    banks: {
      0: stompblock,
      1: stompblock,
    },
  }
  deepFreeze(initialState)

  it('receivedAllTrims success', () => {
    let action = {
      type: RECEIVED_ALL_TRIMS,
      incomingTrims: [],
      bank: 0,
    }
    expect(velocityTrim(initialState, action).banks[0]).toContainEqual({
      group: 'Percussion',
      name: 'Tumba Thump',
      note: 1,
      trim: undefined,
    })

    action = {
      type: RECEIVED_ALL_TRIMS,
      // Not arguing, because the app is working fine as-is...
      // ...but this really should be zero-indexed and not starting at one
      incomingTrims: [0, 77],
      bank: 0,
    }
    expect(velocityTrim(initialState, action).banks[0]).toContainEqual({
      group: 'Percussion',
      name: 'Tumba Open',
      note: 2,
      trim: 77,
    })
  })

  it('userChangedTrim success', () => {
    const action = {
      type: USER_CHANGED_TRIM,
      noteNum: 1,
      value: 66,
      bank: 0,
    }
    expect(velocityTrim(initialState, action).banks[0]).toContainEqual({
      group: 'Percussion',
      name: 'Tumba Thump',
      note: 1,
      trim: 66,
    })
  })

  it('userChangedTrim end success', () => {
    const action = {
      type: USER_CHANGED_TRIM_END,
      noteNum: 1,
      value: 66,
      bank: 0,
    }
    expect(velocityTrim(initialState, action).banks[0]).toContainEqual({
      group: 'Percussion',
      name: 'Tumba Thump',
      note: 1,
      trim: 66,
    })
  })

  it('searchTrims success', () => {
    const action = {
      type: SEARCH_TRIMS,
      search: 'search text',
    }
    expect(velocityTrim(initialState, action)).toEqual({
      ...initialState,
      search: 'search text',
    })
  })

  it('selectTrim success', () => {
    const action = {
      type: SELECT_TRIM,
      selectedNoteNum: 10,
    }
    expect(velocityTrim(initialState, action)).toEqual({
      ...initialState,
      selectedNoteNum: 10,
    })
  })

  it('changeGroup success', () => {
    const action = {
      type: CHANGE_GROUP,
      group: 'new group',
    }
    expect(velocityTrim(initialState, action)).toEqual({
      ...initialState,
      group: 'new group',
    })
  })

  it('changeListView success', () => {
    const action = {
      type: CHANGE_LIST_VIEW,
      listView: 'new view',
    }
    expect(velocityTrim(initialState, action)).toEqual({
      ...initialState,
      listView: 'new view',
    })
  })

  it('loadMapping success', () => {
    const initializedState = {
      ...initialState,
      banks: {
        0: [
          {
            note: 72,
            name: '---',
            group: 'Loading...',
            trim: 0,
          },
        ],
      },
    }

    const action = {
      type: LOAD_MAPPING,
      entries: [
        {
          note: 72,
          name: 'Rock Tom 3',
          group: 'Toms',
          trim: 92,
        },
      ],
    }
    expect(velocityTrim(initializedState, action)).toEqual({
      ...initializedState,
      banks: {
        0: [
          {
            note: 72,
            name: 'Rock Tom 3',
            group: 'Toms',
            trim: 92,
          },
        ],
      },
    })
  })
})
