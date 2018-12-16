import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  LinearProgress,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core'
import Warning from '@material-ui/icons/Warning'
import Dialog from '../Dialog'
import { settingsShape } from '../../reducers/settings'

const FactoryReset = (props) => {
  const { settings, confirmFactoryReset, performFactoryReset } = props
  const { showResetDialog, resetInProcess } = settings

  return (
    <div>
      <Button variant="contained" color="primary" onMouseUp={() => confirmFactoryReset(true)}>
        <Warning />
        <span style={{ paddingLeft: 7 }}>Perform Factory Reset</span>
      </Button>

      <Dialog open={showResetDialog} onClose={() => confirmFactoryReset(false)}>
        <DialogTitle>Confirm Factory Reset</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <b>Sure to perform reset?</b>
            <br />
            <br />
            This will return all settings and trim values to their factory defaults.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => confirmFactoryReset(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={performFactoryReset} variant="contained" color="primary" autoFocus>
            Perform Reset
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={resetInProcess}>
        <DialogTitle>Factory Reset In Progress</DialogTitle>
        <DialogContent>
          <DialogContentText>Please wait...</DialogContentText>
          <LinearProgress />
        </DialogContent>
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
