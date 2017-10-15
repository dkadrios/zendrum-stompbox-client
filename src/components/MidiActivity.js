import React from 'react'
import { connect } from 'react-redux'
import styles from '../styles/midiActivity'

const MidiActivity = ({ stompblock }) => {
  const { midiInActivity, midiOutActivity } = stompblock

  return (
    <div className={styles.midiActivity}>
      <div>Midi in</div>
      <div className={midiInActivity ? styles.ledRedBlink : styles.ledRed} />
      <div>out</div>
      <div
        className={midiOutActivity ? styles.ledYellowBlink : styles.ledYellow}
      />
    </div>
  )
}

const mapStateToProps = ({ stompblock }) => ({ stompblock })

export default connect(mapStateToProps)(MidiActivity)
