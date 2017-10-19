import React from 'react'
import PropTypes from 'prop-types'
import Dialog from 'react-toolbox/lib/dialog'
import UserRegistrationForm from './UserRegistrationForm'
import styles from '../styles/registration'
import GravatarIcon from '../images/Gravatar.svg'

const GravatarLink = ({ content }) => (
  <a href="https://en.gravatar.com/" target="_blank" rel="noopener noreferrer">
    {content}
  </a>
)
GravatarLink.propTypes = { content: PropTypes.node.isRequired }

const UserRegistration = ({ active, hideDialog, submitRegistrationForm, serialNumber }) => {
  const actions = [
    { label: 'Cancel', onClick: hideDialog },
    { label: 'Save', onClick: submitRegistrationForm, raised: true, primary: true },
  ]
  return (
    <Dialog
      actions={actions}
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

      <UserRegistrationForm />

      <div className={styles.gravatarNotice}>
        <GravatarLink content={<GravatarIcon />} />
        <GravatarLink content="We use Gravatar for displaying profile images, based on your email address" />
      </div>
    </Dialog>
  )
}

UserRegistration.propTypes = {
  active: PropTypes.bool.isRequired,
  hideDialog: PropTypes.func.isRequired,
  submitRegistrationForm: PropTypes.func.isRequired,
  serialNumber: PropTypes.string.isRequired,
}

export default UserRegistration
