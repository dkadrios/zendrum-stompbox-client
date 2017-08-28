import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Avatar from 'react-toolbox/lib/avatar'
import Gravatar from 'react-gravatar'
import Popover from 'react-popover'
import Visible from 'react-visible'
import UserRegistration from './UserRegistration'
import styles from '../styles/registration'
import popoverStyle from '../styles/popovers'
import * as stompblockActions from '../action-creators/stompblock'

class UserInfo extends Component {
  constructor(props) {
    super(props)
    this.state = { popoverVisible: !props.version.registered, dialogVisible: false }
  }

  componentWillReceiveProps(newProps) {
    this.setState({ popoverVisible: !newProps.version.registered })
  }

  showDialog(active) {
    this.setState({ dialogVisible: active, popoverVisible: false })
  }

  submitForm(registration) {
    this.props.submitRegistration(this.props.version.serialNumber, registration)
  }

  render() {
    const { version } = this.props
    const popoverContent = () =>
      (<span onClick={() => this.showDialog(true)} role="button" tabIndex="0">
        Please take a moment to register your STOMPBLOCK
      </span>)

    return (
      <div
        className={styles.userInfo}
        onClick={() => this.showDialog(true)}
        role="button"
        tabIndex="0"
      >
        <Visible isVisible={version.checkedRegistration}>
          <span className={styles.name}>{`${version.firstName} ${version.lastName}`}</span>
          <Popover
            isOpen={this.state.popoverVisible}
            place="below"
            body={popoverContent()}
            className={popoverStyle.Popover}
            onOuterAction={() => this.setState({ popoverVisible: false })}
          >
            <Avatar>
              <Gravatar email={version.email} default="mm" rating="x" />
            </Avatar>
          </Popover>
        </Visible>

        <UserRegistration
          active={this.state.dialogVisible}
          showDialog={active => this.showDialog(active)}
          submitForm={payload => this.submitForm(payload)}
          {...this.props}
        />
      </div>
    )
  }
}

const mapStateToProps = ({ version }) => ({ version })
const mapDispatchToProps = dispatch => bindActionCreators(stompblockActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo)
