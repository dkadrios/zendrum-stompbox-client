import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import MappingSelector from '../MappingSelector'
import TS from '../HOC/ToggleSwitch'
import FactoryReset from '../FactoryReset'
import styles from '../../styles/settings'
import * as settingActions from '../../action-creators/settings'
import * as mappingActions from '../../action-creators/mapping'
import * as stompblockActions from '../../action-creators/stompblock'

const Settings = (props) => {
  const {
    settings,
    mapping,
    setMuteEnabled,
    setThruEnabled,
    setMuteGroupsEnabled,
    confirmFactoryReset,
    performFactoryReset,
    selectMapping,
  } = props

  const { muteEnabledAtStart, thruEnabledAtStart, muteGroupsEnabled } = settings
  const { name: mappingName, available: availableMaps } = mapping

  return (
    <div className={styles.settings}>
      <h2>Card</h2>
      <MappingSelector selected={mappingName} available={availableMaps} onChange={selectMapping} />

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

      <FactoryReset
        settings={settings}
        confirmFactoryReset={confirmFactoryReset}
        performFactoryReset={performFactoryReset}
      />
    </div>
  )
}

Settings.propTypes = {
  settings: PropTypes.shape({
    muteEnabledAtStart: PropTypes.bool.isRequired,
    thruEnabledAtStart: PropTypes.bool.isRequired,
    muteGroupsEnabled: PropTypes.bool.isRequired,
  }).isRequired,
  mapping: PropTypes.shape({
    name: PropTypes.string.isRequired,
    available: PropTypes.array.isRequired,
  }).isRequired,
  setMuteEnabled: PropTypes.func.isRequired,
  setThruEnabled: PropTypes.func.isRequired,
  setMuteGroupsEnabled: PropTypes.func.isRequired,
  confirmFactoryReset: PropTypes.func.isRequired,
  performFactoryReset: PropTypes.func.isRequired,
  selectMapping: PropTypes.func.isRequired,
}

const mapStateToProps = ({ settings, mapping }) => ({ settings, mapping })
const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...settingActions, ...mappingActions, ...stompblockActions }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
