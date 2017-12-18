import React from 'react'
import PropTypes from 'prop-types'
import TS from '../HOC/ToggleSwitch'
import { settingsShape } from '../../reducers/settings'

const Preferences = ({
  setMuteEnabled,
  setThruEnabled,
  settings: { muteEnabledAtStart, thruEnabledAtStart },
}) => (
  <div>
    <h2>Startup Preferences</h2>
    <section>
      <TS checked={muteEnabledAtStart} feature="MUTE when turned on" handler={setMuteEnabled} />
      <TS checked={thruEnabledAtStart} feature="THRU when turned on" handler={setThruEnabled} />
    </section>
  </div>
)

Preferences.propTypes = {
  settings: PropTypes.shape(settingsShape).isRequired,
  setMuteEnabled: PropTypes.func.isRequired,
  setThruEnabled: PropTypes.func.isRequired,
}

export default Preferences
