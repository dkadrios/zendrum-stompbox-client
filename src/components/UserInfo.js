import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Avatar from 'material-ui/Avatar'
import Gravatar from 'react-gravatar'
import Popover from 'react-popover'
import Visible from 'react-visible'
import UserRegistration from './UserRegistration'
import UserInfoPopover from './UserInfoPopover'
import styles from '../styles/registration'
import popoverStyle from '../styles/popovers'
import { userShape } from '../reducers/user'
import * as userActions from '../action-creators/user'

const UserInfo = ({ user, showDialog, hideDialog, hidePopover, submitRegistrationForm }) => {
  const {
    checkedRegistration,
    registered,
    firstName,
    lastName,
    email,
    dialogVisible,
    popoverVisible,
  } = user

  return (
    <div className={styles.userInfo}>
      <Visible isVisible={checkedRegistration}>
        <div className={styles.layout}>
          <section onClick={showDialog} role="button" tabIndex="0">
            <div>{registered && 'Registered to:'}</div>
            <span className={styles.name}>{`${firstName} ${lastName}`}</span>
          </section>
          <Popover
            isOpen={popoverVisible}
            onClick={showDialog}
            place="below"
            body={<UserInfoPopover showDialog={showDialog} />}
            className={popoverStyle.Popover}
            onOuterAction={hidePopover}
          >
            <Avatar onClick={showDialog}>
              <Gravatar email={email} default="mm" rating="x" />
            </Avatar>
          </Popover>
        </div>
      </Visible>

      <UserRegistration
        active={dialogVisible}
        hideDialog={hideDialog}
        submitRegistrationForm={submitRegistrationForm}
        {...user}
      />
    </div>
  )
}

UserInfo.propTypes = {
  user: PropTypes.shape(userShape).isRequired,
  showDialog: PropTypes.func.isRequired,
  hideDialog: PropTypes.func.isRequired,
  hidePopover: PropTypes.func.isRequired,
  submitRegistrationForm: PropTypes.func.isRequired,
}

const mapStateToProps = ({ user }) => ({ user })
const mapDispatchToProps = dispatch => bindActionCreators(userActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo)
