import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Avatar from 'react-toolbox/lib/avatar'
import Gravatar from 'react-gravatar'
import Popover from 'react-popover'
import Visible from 'react-visible'
import UserRegistration from './UserRegistration'
import UserInfoPopover from './UserInfoPopover'
import styles from '../styles/registration'
import popoverStyle from '../styles/popovers'
import { userShape } from '../reducers/user'
import * as userActions from '../action-creators/user'

const UserInfo = ({ user, submitRegistration, showDialog, hideDialog, hidePopover }) => {
  const {
    serialNumber,
    checkedRegistration,
    firstName,
    lastName,
    email,
    dialogVisible,
    popoverVisible,
  } = user

  return (
    <div className={styles.userInfo} onClick={showDialog} role="button" tabIndex="0">
      <Visible isVisible={checkedRegistration}>
        <span className={styles.name}>{`${firstName} ${lastName}`}</span>
        <Popover
          isOpen={popoverVisible}
          place="below"
          body={<UserInfoPopover showDialog={showDialog} />}
          className={popoverStyle.Popover}
          onOuterAction={hidePopover}
        >
          <Avatar>
            <Gravatar email={email} default="mm" rating="x" />
          </Avatar>
        </Popover>
      </Visible>

      <UserRegistration
        active={dialogVisible}
        hideDialog={hideDialog}
        submitForm={registration => submitRegistration(serialNumber, registration)}
        {...user}
      />
    </div>
  )
}

UserInfo.propTypes = {
  user: PropTypes.shape(userShape).isRequired,
  submitRegistration: PropTypes.func.isRequired,
  showDialog: PropTypes.func.isRequired,
  hideDialog: PropTypes.func.isRequired,
  hidePopover: PropTypes.func.isRequired,
}

const mapStateToProps = ({ user }) => ({ user })
const mapDispatchToProps = dispatch => bindActionCreators(userActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo)
