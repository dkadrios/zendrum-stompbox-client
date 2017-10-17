import React from 'react'
import PropTypes from 'prop-types'
import Dialog from 'react-toolbox/lib/dialog'
import UserRegistrationForm from './UserRegistrationForm'
import styles from '../styles/registration'
import GravatarIcon from '../images/Gravatar.svg'

const UserRegistration = ({ active, hideDialog, submitForm, serialNumber }) => (
  <Dialog
    active={active}
    onEscKeyDown={hideDialog}
    onOverlayClick={hideDialog}
    className={styles.registrationDialog}
    title="STOMPBLOCK Registration"
  >
    <p>
      Register yourself as the owner of this STOMPBLOCK<br />
      Serial number:<strong> {serialNumber}</strong>
    </p>

    <UserRegistrationForm onSubmit={submitForm} />

    <div className={styles.gravatarNotice}>
      <a href="https://en.gravatar.com/" target="_blank" rel="noopener noreferrer">
        <GravatarIcon />
      </a>
      <a href="https://en.gravatar.com/" target="_blank" rel="noopener noreferrer">
        We use Gravatar for displaying profile images
      </a>
    </div>
  </Dialog>
)

UserRegistration.propTypes = {
  active: PropTypes.bool.isRequired,
  hideDialog: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
  serialNumber: PropTypes.string.isRequired,
}

export default UserRegistration
