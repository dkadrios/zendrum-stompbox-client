/* eslint-disable no-console */
import storeFactory from '../src/store'
import { RECEIVED_VERSION } from '../src/action-creators/actions'

describe('Store Factory', () => {
  beforeAll(() => {
    console.groupCollapsed = jest.fn()
    console.log = jest.fn()
    console.groupEnd = jest.fn()
  })

  afterEach(() => jest.resetAllMocks())

  describe('Logging', () => {
    let store

    beforeEach(() => {
      store = storeFactory({}, true, true)
      store.dispatch({
        type: RECEIVED_VERSION,
      })
    })

    it('starts a console group', () => expect(console.groupCollapsed.mock.calls.length).toBe(2))

    it('logs state before action and state after', () => {
      const rows = console.log.mock.calls.map(args => args[0])
      expect(rows.length).toBe(10)
      expect(rows[0]).toContain('%c prev state')

      expect(rows.slice(1, 4)).toEqual(['%c action    ', '%c next state', '%c CHANGED:'])
    })

    it('ends the console group', () => expect(console.groupEnd.mock.calls.length).toBe(2))
  })
})
