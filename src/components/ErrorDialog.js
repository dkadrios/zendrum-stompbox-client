import React from 'react'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'
import Slide from 'material-ui/transitions/Slide'

const Transition = props => <Slide direction="up" {...props} />

const ErrorDialog = ({ errorMessage, errorVisible, dismissError }) => (
  <Dialog open={errorVisible} transition={Transition} onClose={dismissError}>
    <DialogTitle>Error</DialogTitle>
    <DialogContent>
      <DialogContentText>{errorMessage}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={dismissError} variant="raised" color="primary" autoFocus>
        OK
      </Button>
    </DialogActions>
  </Dialog>
)

ErrorDialog.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  errorVisible: PropTypes.bool.isRequired,
  dismissError: PropTypes.func.isRequired,
}

export default ErrorDialog
