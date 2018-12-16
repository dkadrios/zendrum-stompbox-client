import React from 'react'
import PropTypes from 'prop-types'
import {
  withStyles,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  SvgIcon,
} from '@material-ui/core'
import UserRegistrationForm from './UserRegistrationForm'
import GravatarIcon from '../images/Gravatar.svg'
import Dialog from './Dialog'

const styles = {
  icon: {
    width: 36,
    height: 36,
    marginRight: 7,
  },
  link: {
    color: 'black',
  },
  gravatarNotice: {
    display: 'flex',
    maxWidth: 330,
  },
}

const GravatarLink = ({ content }) => (
  <a
    href="https://en.gravatar.com/"
    target="_blank"
    rel="noopener noreferrer"
  >
    {content}
  </a>
)
GravatarLink.propTypes = { content: PropTypes.node.isRequired }

const UserRegistration = ({ active, hideDialog, submitRegistrationForm, serialNumber, classes }) => (
  <Dialog
    open={active}
    onClose={hideDialog}
  >
    <DialogTitle>STOMPBLOCK Registration</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Register yourself as the owner of this STOMPBLOCK
        <br />
        Serial number:<strong> {serialNumber}</strong>
      </DialogContentText>

      <UserRegistrationForm />

      <div className={classes.gravatarNotice}>
        <GravatarLink
          content={(
            <SvgIcon className={classes.icon}>
              <GravatarIcon />
            </SvgIcon>
)}
        />
        <GravatarLink
          className={classes.link}
          content="We use Gravatar for displaying profile images, based on your email address"
        />
      </div>
    </DialogContent>
    <DialogActions>
      <Button onClick={hideDialog}>Cancel</Button>
      <Button
        variant="contained"
        onClick={submitRegistrationForm}
        color="primary"
        autoFocus
      >
        Register
      </Button>
    </DialogActions>
  </Dialog>
)

UserRegistration.propTypes = {
  active: PropTypes.bool.isRequired,
  hideDialog: PropTypes.func.isRequired,
  submitRegistrationForm: PropTypes.func.isRequired,
  serialNumber: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(UserRegistration)
