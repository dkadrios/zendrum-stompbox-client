import React from 'react'
import PropTypes from 'prop-types'

const UserInfoPopover = ({ showDialog }) => (
  <span
    onClick={showDialog}
    role="button"
    tabIndex="0"
  >
    Please take a moment to register your STOMPBLOCK
  </span>
)

UserInfoPopover.propTypes = { showDialog: PropTypes.func.isRequired }

export default UserInfoPopover
