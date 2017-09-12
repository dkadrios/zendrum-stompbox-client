/* @flow */
import {
  SYSEX_START,
  STOMPBLOCK_DEVICE_ID,
  CURRENT_ANVIL_VERSION,
  SYSEX_MSG_RECEIVE_VERSION,
  SYSEX_MSG_RECEIVED_MUTE_ENABLED,
  SYSEX_MSG_RECEIVED_THRU_ENABLED,
  SYSEX_MSG_RECEIVED_MUTE_GROUPS_ENABLED,
  SYSEX_MSG_RECEIVE_ALL,
  SYSEX_MSG_RECEIVED_MUTE_GROUPS,
} from './midi'

import {
  receivedVersion,
  reloadSysEx,
  receivedVelocityTrims,
  receivedMuteEnabled,
  receivedThruEnabled,
  receivedMuteGroupsEnabled,
  receivedMuteGroups,
  sysexAction,
} from './action-creators/sysex'

import type { SysexBarrier, SysexMessage } from './midi'
import type { Dispatch } from './types/Store'

export default (dispatch: Dispatch, { data }: { data: Array<number> }) => {
  const [
    kind: SysexBarrier,
    deviceId: number,
    anvilVersion: number,
    command: SysexMessage,
    ...packet
  ] = data.slice(0, data.length - 1)
  // One of our packets?
  if (
    kind === SYSEX_START &&
    deviceId === STOMPBLOCK_DEVICE_ID &&
    (anvilVersion === CURRENT_ANVIL_VERSION ||
      anvilVersion === 24 ||
      command === SYSEX_MSG_RECEIVE_VERSION)
  ) {
    let serial: Array<number>
    let trims: Array<number>

    switch (command) {
      case SYSEX_MSG_RECEIVE_VERSION:
        // TODO: find more functional way to do this.
        // Trim SysEx header and footer
        serial = [...packet].slice(1, packet.length - 2)
        // Remove any trailing zeros (but none within!)
        while (serial.length && serial[serial.length - 1] === 0) {
          serial.pop()
        }

        dispatch(
          receivedVersion(
            packet[0], // version
            serial.reduce(
              (val: string, char: number): string => val + String.fromCharCode(char),
              '',
            ),
          ),
        )

        if (packet[0] === CURRENT_ANVIL_VERSION || packet[0] === 24) {
          // TODO dispatch registration check first, then chain that to reloadSysEx
          dispatch(sysexAction(SYSEX_MSG_RECEIVED_MUTE_ENABLED))
          dispatch(sysexAction(SYSEX_MSG_RECEIVED_THRU_ENABLED))
          dispatch(sysexAction(SYSEX_MSG_RECEIVED_MUTE_GROUPS_ENABLED))
          dispatch(sysexAction(SYSEX_MSG_RECEIVED_MUTE_GROUPS))
          /* istanbul ignore next */
          if (!__TEST__) {
            dispatch(reloadSysEx())
          }
        }
        break

      case SYSEX_MSG_RECEIVE_ALL:
        trims = packet.filter((item: number, idx: number): boolean => idx < 127)
        dispatch(receivedVelocityTrims(trims))
        break

      case SYSEX_MSG_RECEIVED_MUTE_ENABLED:
        dispatch(receivedMuteEnabled(!!packet[0]))
        break

      case SYSEX_MSG_RECEIVED_THRU_ENABLED:
        dispatch(receivedThruEnabled(!!packet[0]))
        break

      case SYSEX_MSG_RECEIVED_MUTE_GROUPS_ENABLED:
        dispatch(receivedMuteGroupsEnabled(!!packet[0]))
        break

      case SYSEX_MSG_RECEIVED_MUTE_GROUPS:
        dispatch(receivedMuteGroups(packet))
        break

      default:
        console.log('Unknown SysEx message received: ', command) // eslint-disable-line
    }
  }
}
