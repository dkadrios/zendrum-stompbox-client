import React from 'react'
import PropTypes from 'prop-types'
import Button from 'react-toolbox/lib/button'
import Dialog from 'react-toolbox/lib/dialog'
import FontIcon from 'react-toolbox/lib/font_icon'
import ProgressBar from 'react-toolbox/lib/progress_bar'
import buttonTheme from '../../styles/react-toolbox-theme/WarningButton.scss'
import styles from '../../styles/settings'
import { settingsShape } from '../../reducers/settings'

const FactoryReset = (props) => {
  const { settings, confirmFactoryReset, performFactoryReset } = props
  const { showResetDialog, resetInProcess } = settings

  const actions = [
    { label: 'Cancel', onClick: () => confirmFactoryReset(false) },
    { label: 'Perform Reset', onClick: performFactoryReset },
  ]

  return (
    <div>
      <Button
        theme={buttonTheme}
        icon="warning"
        label="Perform Factory Reset"
        raised
        primary
        onMouseUp={() => confirmFactoryReset(true)}
      />

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

FactoryReset.propTypes = {
  settings: PropTypes.shape(settingsShape).isRequired,
  confirmFactoryReset: PropTypes.func.isRequired,
  performFactoryReset: PropTypes.func.isRequired,
}

export default FactoryReset
