import deepFreeze from 'deep-freeze'
import muteGroups from '../../src/reducers/muteGroups'

describe('muteGroups reducer', () => {
  const initialState = {
    muteGroups: [],
  }
  deepFreeze(initialState)

  it('receivedMuteGroups success', () => {
    const action = {
      type: 'RECEIVED_MUTE_GROUPS',
      payload: [1, 2, 2, 25, 26, 35, 36],
    }
    expect(muteGroups(initialState, action)).toEqual({
      ...initialState,
      muteGroups: [
        {
          muteables: [
            {
              group: 'Kicks',
              name: 'Funk Kick',
              note: 25,
              trim: 0,
            },
            {
              group: 'Kicks',
              name: 'Jazz Kick',
              note: 26,
              trim: 0,
            },
          ],
          muters: [
            {
              group: 'Snares',
              name: 'Reggae Snare Drag',
              note: 35,
              trim: 0,
            },
            {
              group: 'Snares',
              name: 'Reggae Snare Off',
              note: 36,
              trim: 0,
            },
          ],
        },
      ],
    })
  })
})
