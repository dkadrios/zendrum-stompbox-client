import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Typography, Grid } from '@material-ui/core'
import { stompblockShape } from '../reducers/stompblock'

const MidiActivity = ({ stompblock }) => {
  const { midiInActivity, midiOutActivity } = stompblock

  return (
    <Grid container>
      <Typography>Midi</Typography>
      {/* <div className={midiInActivity ? styles.ledRedBlink : styles.ledRed} />
      <div className={midiOutActivity ? styles.ledYellowBlink : styles.ledYellow} /> */}
      <Typography>TODO</Typography>
    </Grid>
  )
}

MidiActivity.propTypes = {
  stompblock: PropTypes.shape(stompblockShape).isRequired,
}

const mapStateToProps = ({ stompblock }) => ({ stompblock })

export default connect(mapStateToProps)(MidiActivity)
