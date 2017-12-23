import deepFreeze from 'deep-freeze'
import mapping from '../../src/reducers/mapping'
import { LOAD_MAPPING } from '../../src/action-creators/actions'

describe('mapping reducer', () => {
  const initialState = {
    banks: {
      0: {
        name: '',
        entries: [],
      },
      1: {
        name: '',
        entries: [],
      },
    },
    available: [
      { name: 'stompblock', label: 'STOMPBLOCK' },
      { name: 'emrichNumber1', label: 'John Emrich - Articulations #1' },
    ],
  }
  deepFreeze(initialState)

  it('load mapping success', () => {
    const action = {
      type: LOAD_MAPPING,
      name: 'User Defined Card',
      bank: 1,
      entries: [{ note: 27, name: 'gong drum', group: 'Toms' }],
    }
    expect(mapping(initialState, action)).toEqual({
      ...initialState,
      banks: {
        0: {
          name: '',
          entries: [],
        },
        1: {
          name: 'User Defined Card',
          entries: [{ note: 27, name: 'gong drum', group: 'Toms' }],
        },
      },
    })
  })
})
