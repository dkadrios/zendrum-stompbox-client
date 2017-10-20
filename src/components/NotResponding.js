import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Dialog from 'react-toolbox/lib/dialog'
import FontIcon from 'react-toolbox/lib/font_icon'
import styles from '../styles/midiSecurity'
import { stompblockShape } from '../reducers/stompblock'

const NotResponding = ({ stompblock: { responding } }) => (
  <Dialog
    active={!responding}
    title="STOMPBLOCK Not Responding"
    className={styles.noStompblockFound}
  >
    <div>
      <FontIcon>error_outline</FontIcon>
      <p>
        There appears to be an available STOMPBLOCK attached to your computer, however it is not
        responding to requests.
      </p>
    </div>
    <h2>Troubleshooting</h2>
    <ul>
      <li>Check that no other software is utilizing your STOMPBLOCK</li>
      <li>Plug directly into a USB port, if using a HUB or other USB host device</li>
      <li>Try a different USB port</li>
      <li>Power down the STOMPBLOCK, plug it back in, wait 5 seconds and then refresh this page</li>
    </ul>
  </Dialog>
)

NotResponding.propTypes = {
  stompblock: PropTypes.shape(stompblockShape).isRequired,
}

const mapStateToProps = ({ stompblock }) => ({ stompblock })

export default connect(mapStateToProps)(NotResponding)
