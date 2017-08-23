import React, { Component } from 'react'
import { connect } from 'react-redux'
import Dialog from 'react-toolbox/lib/dialog'
import FontIcon from 'react-toolbox/lib/font_icon'
import styles from '../styles/midiSecurity'

class MidiSecurity extends Component {
  constructor(props) {
    super(props)
    this.state = { active: false }
  }

  componentWillMount() {
    // Give web midi a change to start up before assuming no access given.
    setTimeout(() => {
      this.setState({ active: !this.props.stompblock.accessGranted })
    }, 2000)
  }

  render() {
    const { stompblock } = this.props

    return (
      <Dialog
        active={this.state.active && !stompblock.accessGranted}
        title="Your Permission Is Required"
        className={styles.midiSecurity}
      >
        <div>
          <FontIcon>security</FontIcon>
          <p>
            This application requires special permissions before it can use SysEx and connect to
            your Zendrum STOMPBLOCK.
          </p>
        </div>
        <p>Please select &apos;Allow&apos; when prompted by your browser.</p>
      </Dialog>
    )
  }
}

const mapStateToProps = ({ stompblock }) => ({ stompblock })

export default connect(mapStateToProps)(MidiSecurity)
