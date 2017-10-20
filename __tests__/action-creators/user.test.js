import deepFreeze from 'deep-freeze'
import storeFactory from '../../src/store'
import {
  deviceRegistered,
  showDialog,
  hideDialog,
  showPopover,
  hidePopover,
} from '../../src/action-creators/user'

describe('user actions', () => {
  let store

  const user = {
    serialNumber: '',
    firstName: '',
    lastName: '',
    email: '',
    checkedRegistration: false,
    registered: false,
    dialogVisible: false,
    popoverVisible: false,
  }

  deepFreeze(user)

  beforeEach(() => {
    store = storeFactory({ user }, false, true)
  })

  it('deviceRegistered should succeed, when not registered to a user', () => {
    store.dispatch(deviceRegistered({ registrations: [] }))

    expect(store.getState().user).toEqual({
      ...user,
      checkedRegistration: true,
      popoverVisible: true,
    })
  })

  it('deviceRegistered should succeed, when registered to a non-active user', () => {
    store.dispatch(deviceRegistered({
      registrations: [
        {
          firstName: 'Testy',
          lastName: 'McTesterson',
          email: '',
          active: false,
        },
      ],
    }))

    expect(store.getState().user).toEqual({
      ...user,
      checkedRegistration: true,
      popoverVisible: true,
    })
  })

  it('deviceRegistered should succeed, when registered to a user', () => {
    store.dispatch(deviceRegistered({
      registrations: [
        {
          firstName: 'Testy',
          lastName: 'McTesterson',
          email: '',
          active: true,
        },
      ],
    }))

    expect(store.getState().user).toEqual({
      ...user,
      checkedRegistration: true,
      popoverVisible: false,
      registered: true,
      firstName: 'Testy',
      lastName: 'McTesterson',
      email: '',
    })
  })

  it('showDialog should succeed', () => {
    store.dispatch(showDialog())

    expect(store.getState().user).toEqual({
      ...user,
      dialogVisible: true,
    })
  })

  it('hideDialog should succeed', () => {
    store.dispatch(showDialog())
    store.dispatch(hideDialog())

    expect(store.getState().user).toEqual({
      ...user,
      dialogVisible: false,
    })
  })

  it('showPopover should succeed', () => {
    store.dispatch(showPopover())

    expect(store.getState().user).toEqual({
      ...user,
      popoverVisible: true,
    })
  })

  it('hidePopover should succeed', () => {
    store.dispatch(showPopover())
    store.dispatch(hidePopover())

    expect(store.getState().user).toEqual({
      ...user,
      popoverVisible: false,
    })
  })
})
