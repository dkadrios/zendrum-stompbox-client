import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Button from 'react-toolbox/lib/button'
import Dialog from 'react-toolbox/lib/dialog'
import FontIcon from 'react-toolbox/lib/font_icon'
import ProgressBar from 'react-toolbox/lib/progress_bar'
import Switch from 'react-toolbox/lib/switch'
import MappingSelector from '../MappingSelector'
import styles from '../../styles/settings'
import switchTheme from '../../styles/react-toolbox-theme/Switch.scss'
import buttonTheme from '../../styles/react-toolbox-theme/WarningButton.scss'
import * as sysexActions from '../../action-creators/sysex'
import * as mappingActions from '../../action-creators/mapping'

const Settings = props => {
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

  const {
    muteEnabledAtStart,
    thruEnabledAtStart,
    muteGroupsEnabled,
    showResetDialog,
    resetInProcess,
  } = settings

  const { name: mappingName, available: availableMaps } = mapping

  const actions = [
    { label: 'Cancel', onClick: () => confirmFactoryReset(false) },
    { label: 'Perform Reset', onClick: performFactoryReset },
  ]

  const TS = ({ checked, feature, handler }) => (
    <Switch
      theme={switchTheme}
      checked={checked}
      label={`Enable ${feature}`}
      onChange={value => handler(value)}
    />
  )

  return (
    <div className={styles.settings}>
      <h2>Card</h2>
      <MappingSelector
        selected={mappingName}
        available={availableMaps}
        onChange={selectMapping}
      />

      <h2>Preferences</h2>
      <section>
        <p>These settings directly affect the behavior of your STOMPBLOCK.</p>
        <TS
          checked={muteEnabledAtStart}
          feature="MUTE when turned on"
          handler={setMuteEnabled}
        />
        <TS
          checked={thruEnabledAtStart}
          feature="THRU when turned on"
          handler={setThruEnabled}
        />
        <TS
          checked={muteGroupsEnabled}
          feature="mute groups (e.g. hi-hats)"
          handler={setMuteGroupsEnabled}
        />
      </section>

      <section>
        <Button
          theme={buttonTheme}
          icon="warning"
          label="Perform Factory Reset"
          raised
          primary
          onMouseUp={() => confirmFactoryReset(true)}
        />
      </section>

      <Dialog
        actions={actions}
        active={showResetDialog}
        onEscKeyDown={() => confirmFactoryReset(false)}
        onOverlayClick={() => confirmFactoryReset(false)}
        title="Confirm Factory Reset"
        className={styles.resetDialog}
      >
        <div className={styles.warningHeader}>
          <FontIcon>warning</FontIcon>
          <p>Sure to perform reset?</p>
        </div>
        <p>
          This will return all settings and trim values to their factory
          defaults.
        </p>
      </Dialog>

      <Dialog
        active={resetInProcess}
        title="Factory Reset In Progress"
        className={styles.resetDialog}
      >
        <p>Please wait...</p>
        <ProgressBar mode="indeterminate" />
      </Dialog>
    </div>
  )
}

const mapStateToProps = ({ settings, mapping }) => ({ settings, mapping })
const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...sysexActions, ...mappingActions }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
