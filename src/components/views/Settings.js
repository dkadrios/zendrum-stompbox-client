/* @flow */
/* eslint-disable import/no-duplicates */
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Button from 'react-toolbox/lib/button'
import Dialog from 'react-toolbox/lib/dialog'
import FontIcon from 'react-toolbox/lib/font_icon'
import ProgressBar from 'react-toolbox/lib/progress_bar'
import Switch from 'react-toolbox/lib/switch'
import styles from '../../styles/settings'
import switchTheme from '../../styles/react-toolbox-theme/Switch.scss'
import buttonTheme from '../../styles/react-toolbox-theme/WarningButton.scss'
import * as sysexActions from '../../action-creators/sysex'
import type { SettingsState } from '../../reducers/settings'
import typeof {
  setMuteEnabled as SetMuteEnabled,
  setThruEnabled as SetThruEnabled,
  setMuteGroupsEnabled as SetMuteGroupsEnabled,
  confirmFactoryReset as ConfirmFactoryReset,
  performFactoryReset as PerformFactoryReset,
} from '../../action-creators/sysex'
import type { Dispatch } from '../../types/Store'

type SettingsType = { +settings: SettingsState }
type ToggleSwitchType = { +checked: boolean, +feature: string, +handler: Function }

type Props = {
  +settings: SettingsState,
  +setMuteEnabled: SetMuteEnabled,
  +setThruEnabled: SetThruEnabled,
  +setMuteGroupsEnabled: SetMuteGroupsEnabled,
  +confirmFactoryReset: ConfirmFactoryReset,
  +performFactoryReset: PerformFactoryReset,
}

const Settings = (props: Props) => {
  const {
    settings,
    setMuteEnabled,
    setThruEnabled,
    setMuteGroupsEnabled,
    confirmFactoryReset,
    performFactoryReset,
  } = props

  const {
    muteEnabledAtStart,
    thruEnabledAtStart,
    muteGroupsEnabled,
    showResetDialog,
    resetInProcess,
  } = settings

  const actions = [
    { label: 'Cancel', onClick: () => confirmFactoryReset(false) },
    { label: 'Perform Reset', onClick: performFactoryReset },
  ]

  const TS = ({ checked, feature, handler }: ToggleSwitchType) => (
    <Switch
      theme={switchTheme}
      checked={checked}
      label={`Enable ${feature}`}
      onChange={(value: boolean) => handler(value)}
    />
  )

  return (
    <div className={styles.settings}>
      <p>These settings directly affect the behavior of your STOMPBLOCK.</p>
      <section>
        <TS checked={muteEnabledAtStart} feature="MUTE when turned on" handler={setMuteEnabled} />
        <TS checked={thruEnabledAtStart} feature="THRU when turned on" handler={setThruEnabled} />
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
        <p>This will return all settings and trim values to their factory defaults.</p>
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

const mapStateToProps = ({ settings }: SettingsType) => ({ settings })
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(sysexActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
