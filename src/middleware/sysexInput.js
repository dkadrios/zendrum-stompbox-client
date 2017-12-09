import { RECEIVE_MIDI_MESSAGE, SEND_MIDI_MESSAGE } from 'redux-midi'
import { STOMPBLOCK_FOUND, RECEIVED_VERSION } from '../action-creators/actions'
import { midiInActivityChanged, midiOutActivityChanged } from '../action-creators/stompblock'
import { checkVersion } from '../action-creators/version'
import { notResponding } from '../action-creators/stompblock'
import processMidiMessage from '../midi/sysexInput'

let midiInTimer
let midiOutTimer
let waitForVersionTimer

export default store => next => (action) => {
  const flickerTimeout = 200
  const assumeNotRespondingTimeout = 1000

  switch (action.type) {
    case RECEIVE_MIDI_MESSAGE:
      processMidiMessage(store, action.payload)
      clearTimeout(midiInTimer)
      store.dispatch(midiInActivityChanged(true))
      /* istanbul ignore next */
      midiInTimer = setTimeout(() => {
        store.dispatch(midiInActivityChanged(false))
      }, flickerTimeout)
      break

    case SEND_MIDI_MESSAGE:
      clearTimeout(midiOutTimer)
      store.dispatch(midiOutActivityChanged(true))
      /* istanbul ignore next */
      midiOutTimer = setTimeout(() => {
        store.dispatch(midiOutActivityChanged(false))
      }, flickerTimeout)
      break

    case STOMPBLOCK_FOUND:
      waitForVersionTimer = setTimeout(() => {
        store.dispatch(notResponding())
      }, assumeNotRespondingTimeout)
      store.dispatch(checkVersion())
      break

    case RECEIVED_VERSION:
      clearTimeout(waitForVersionTimer)
      break

    default:
      break
  }
  return next(action)
}
