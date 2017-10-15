import deepFreeze from 'deep-freeze'
import muteGroups from '../../src/reducers/muteGroups'
import { RECEIVED_MUTE_GROUPS } from '../../src/action-creators/actions'

describe('muteGroups reducer', () => {
  const initialState = {
    data: [],
  }
  deepFreeze(initialState)

  it('receivedMuteGroups success', () => {
    const action = {
      type: RECEIVED_MUTE_GROUPS,
      groups: [1, 2, 2, 25, 26, 35, 36],
    }
    expect(muteGroups(initialState, action)).toEqual({
      ...initialState,
      data: [
        {
          muteables: [25, 26],
          muters: [35, 36],
        },
      ],
    })
  })
})
