import configureStore from 'redux-mock-store' // eslint-disable-line
import 'jest-localstorage-mock'
import { RECEIVE_MIDI_MESSAGE, SEND_MIDI_MESSAGE } from 'redux-midi'
import {
  SYSEX_START,
  SYSEX_MSG_RECEIVE_VERSION,
  sysexMiddleware,
  watchForDeviceChange,
} from '../src/midi'
import {
  STOMPBLOCK_MISSING,
  SEARCHED_FOR_STOMPBLOCK,
  STOMPBLOCK_FOUND,
} from '../src/action-creators/actions'

describe('web midi integration', () => {
  const middlewares = []
  const mockStore = configureStore(middlewares)

  it('should not find a device', () => {
    const initialState = { midi: { devices: [] } }
    const action = { type: 'FAKE_ACTION_FOR_NOW' }
    const store = mockStore(initialState)
    watchForDeviceChange(store)
    store.dispatch(action)

    const actions = store.getActions()
    expect(actions).toEqual([
      action,
      { type: STOMPBLOCK_MISSING },
      { type: SEARCHED_FOR_STOMPBLOCK },
    ])
  })

  it('should find a device', () => {
    const initialState = {
      midi: {
        devices: [
          {
            type: 'input',
            name: 'Zendrum STOMPBLOCK',
          },
          {
            type: 'output',
            name: 'Zendrum STOMPBLOCK',
          },
        ],
      },
    }
    const action = { type: 'FAKE_ACTION_FOR_NOW' }
    const store = mockStore(initialState)
    watchForDeviceChange(store)
    store.dispatch(action)

    const actions = store.getActions()
    expect(actions).toEqual([
      action,
      { payload: [undefined], type: 'redux-midi/midi/SET_LISTENING_DEVICES' },
      { type: STOMPBLOCK_FOUND },
      { type: SEARCHED_FOR_STOMPBLOCK },
    ])
  })
})

describe('our custom middleware for sysex', () => {
  const middlewares = []
  const mockStore = configureStore(middlewares)
  it('should pass the intercepted action to next', () => {
    const nextArgs = []
    const fakeNext = (...args) => {
      nextArgs.push(args)
    }
    const fakeStore = {}

    const action = { type: 'FAKE_ACTION' }
    sysexMiddleware({ fakeStore })(fakeNext)(action)
    expect(nextArgs[0]).toEqual([action])
  })

  it('should handle MIDI IN messages', () => {
    const next = jest.fn()
    const action = {
      type: RECEIVE_MIDI_MESSAGE,
      payload: {
        data: [
          SYSEX_START,
          22, // device id
          22, // anvil version
          SYSEX_MSG_RECEIVE_VERSION,
          0,
          1,
        ],
      },
    }
    const fakeStore = mockStore({})
    sysexMiddleware(fakeStore)(next)(action)
    expect(next.mock.calls).toEqual([[action]])
  })

  it('should handle MIDI OUT messages', () => {
    const next = jest.fn()
    const action = { type: SEND_MIDI_MESSAGE }
    const fakeStore = mockStore({})

    sysexMiddleware(fakeStore)(next)(action)
    expect(next.mock.calls).toEqual([[action]])
  })

  it('should handle stompblock being found', () => {
    const next = jest.fn()
    const action = { type: STOMPBLOCK_FOUND }
    const store = { dispatch: f => f }
    sysexMiddleware(store)(next)(action)
    expect(next.mock.calls).toEqual([[action]])
  })
})
