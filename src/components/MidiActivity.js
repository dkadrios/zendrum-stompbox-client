import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styles from '../styles/midiActivity'

const MidiActivity = ({ stompblock }) => {
  const { midiInActivity, midiOutActivity } = stompblock

  return (
    <div className={styles.midiActivity}>
      <div>Midi in</div>
      <div className={midiInActivity ? styles.ledRedBlink : styles.ledRed} />
      <div>out</div>
      <div className={midiOutActivity ? styles.ledYellowBlink : styles.ledYellow} />
    </div>
  )
}

MidiActivity.propTypes = {
  stompblock: PropTypes.shape({
    midiInActivity: PropTypes.bool.isRequired,
    midiOutActivity: PropTypes.bool.isRequired,
  }).isRequired,
}

const mapStateToProps = ({ stompblock }) => ({ stompblock })

export default connect(mapStateToProps)(MidiActivity)
