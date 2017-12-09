import React from 'react'
import PropTypes from 'prop-types'
import TS from '../HOC/ToggleSwitch'
import { settingsShape } from '../../reducers/settings'

const Preferences = ({
  setMuteEnabled,
  setThruEnabled,
  setMuteGroupsEnabled,
  settings: { muteEnabledAtStart, thruEnabledAtStart, muteGroupsEnabled },
}) => (
  <div>
    <h2>Preferences</h2>
    <section>
      <p>These settings directly affect the behavior of your STOMPBLOCK.</p>
      <TS checked={muteEnabledAtStart} feature="MUTE when turned on" handler={setMuteEnabled} />
      <TS checked={thruEnabledAtStart} feature="THRU when turned on" handler={setThruEnabled} />
      <TS
        checked={muteGroupsEnabled}
        feature="mute groups (e.g. hi-hats)"
        handler={setMuteGroupsEnabled}
      />
    </section>
  </div>
)

Preferences.propTypes = {
  settings: PropTypes.shape(settingsShape).isRequired,
  setMuteEnabled: PropTypes.func.isRequired,
  setThruEnabled: PropTypes.func.isRequired,
  setMuteGroupsEnabled: PropTypes.func.isRequired,
}

export default Preferences
