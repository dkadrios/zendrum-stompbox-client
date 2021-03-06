import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import { stompblockShape } from '../reducers/stompblock'
import Dialog from './Dialog'

class MidiSecurity extends Component {
  static propTypes = {
    stompblock: PropTypes.shape(stompblockShape).isRequired,
  }

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
      <Dialog open={this.state.active && !stompblock.accessGranted}>
        <DialogTitle>Your Permission Is Required</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This application requires special permissions before it can use SysEx and connect to your Zendrum
            STOMPBLOCK.
          </DialogContentText>

          <DialogContentText>
            <br />
          </DialogContentText>

          <DialogContentText>Please select &apos;Allow&apos; when prompted by your browser.</DialogContentText>
        </DialogContent>
      </Dialog>
    )
  }
}

const mapStateToProps = ({ stompblock }) => ({ stompblock })

export default connect(mapStateToProps)(MidiSecurity)
