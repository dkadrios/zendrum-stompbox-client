import React from 'react'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'
import Slide from 'material-ui/transitions/Slide'
import SvgIcon from 'material-ui/SvgIcon'
import UserRegistrationForm from './UserRegistrationForm'
import GravatarIcon from '../images/Gravatar.svg'

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

const Transition = props => <Slide direction="up" {...props} />

const GravatarLink = ({ content }) => (
  <a href="https://en.gravatar.com/" target="_blank" rel="noopener noreferrer">
    {content}
  </a>
)
GravatarLink.propTypes = { content: PropTypes.node.isRequired }

const UserRegistration = ({
  active,
  hideDialog,
  submitRegistrationForm,
  serialNumber,
  classes,
}) => (
  <Dialog open={active} transition={Transition} onClose={hideDialog}>
    <DialogTitle>STOMPBLOCK Registration</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Register yourself as the owner of this STOMPBLOCK<br />
        Serial number:<strong> {serialNumber}</strong>
      </DialogContentText>

      <UserRegistrationForm />

      <div className={classes.gravatarNotice}>
        <GravatarLink
          content={
            <SvgIcon className={classes.icon}>
              <GravatarIcon />
            </SvgIcon>
          }
        />
        <GravatarLink
          className={classes.link}
          content="We use Gravatar for displaying profile images, based on your email address"
        />
      </div>
    </DialogContent>
    <DialogActions>
      <Button onClick={hideDialog}>Cancel</Button>
      <Button variant="raised" onClick={submitRegistrationForm} color="primary" autoFocus>
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
