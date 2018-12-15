import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Avatar, Grid, Typography } from '@material-ui/core'
import Gravatar from 'react-gravatar'
import Popover from 'react-popover'
import UserRegistration from './UserRegistration'
import UserInfoPopover from './UserInfoPopover'
import { userShape } from '../reducers/user'
import * as userActions from '../action-creators/user'

const UserInfo = ({ user, showDialog, hideDialog, hidePopover, submitRegistrationForm }) => {
  const { checkedRegistration, registered, firstName, lastName, email, dialogVisible, popoverVisible } = user

  return (
    <>
      {checkedRegistration && (
        <Grid
          container
          spacing={16}
        >
          <Grid item>
            <div
              onClick={showDialog}
              role="button"
              tabIndex="0"
            >
              <Grid
                container
                direction="column"
              >
                <Typography
                  color="secondary"
                  variant="body1"
                >
                  {registered && 'Registered to'}
                </Typography>
                <Typography
                  color="secondary"
                  variant="body2"
                >
                  {`${firstName} ${lastName}`}
                </Typography>
              </Grid>
            </div>
          </Grid>
          <Grid item>
            <Popover
              isOpen={popoverVisible}
              onClick={showDialog}
              place="below"
              body={<UserInfoPopover showDialog={showDialog} />}
              onOuterAction={hidePopover}
            >
              <Avatar onClick={showDialog}>
                <Gravatar
                  email={email}
                  default="mm"
                  rating="x"
                />
              </Avatar>
            </Popover>
          </Grid>
        </Grid>
      )}

      <UserRegistration
        active={dialogVisible}
        hideDialog={hideDialog}
        submitRegistrationForm={submitRegistrationForm}
        {...user}
      />
    </>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserInfo)
