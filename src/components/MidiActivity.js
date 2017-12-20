import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styles from '../styles/midiActivity'
import { stompblockShape } from '../reducers/stompblock'

const MidiActivity = ({ stompblock }) => {
  const { midiInActivity, midiOutActivity } = stompblock

  return (
    <div className={styles.midiActivity}>
      <div>Midi</div>
      <div className={midiInActivity ? styles.ledRedBlink : styles.ledRed} />
      <div className={midiOutActivity ? styles.ledYellowBlink : styles.ledYellow} />
    </div>
  )
}

MidiActivity.propTypes = {
  stompblock: PropTypes.shape(stompblockShape).isRequired,
}

const mapStateToProps = ({ stompblock }) => ({ stompblock })

export default connect(mapStateToProps)(MidiActivity)
