import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Grid, Typography } from '@material-ui/core'
import { stompblockShape } from '../reducers/stompblock'

const percent = value => (value === 1 ? 0 : value === 127 ? 100 : Math.round(value / 1.27))

const formatPercent = value => (value === -1 ? '-- ' : percent(value))

const InternalState = ({ stompblock }) => {
  const { volumeSetting, velocitySetting, muteState, demoState, thruState } = stompblock

  return (
    <Grid
      container
      spacing={8}
    >
      <Grid item>
        <Typography>
          Vol <strong>{formatPercent(volumeSetting)}</strong>
        </Typography>
      </Grid>
      <Grid item>
        <Typography>
          Sen <strong>{formatPercent(velocitySetting)}</strong>
        </Typography>
      </Grid>

      <Grid item>
        {/* <div className={muteState ? styles.ledRedBlink : styles.ledRed} />
        <div className={demoState ? styles.ledYellowBlink : styles.ledYellow} />
        <div className={thruState ? styles.ledGreenBlink : styles.ledGreen} /> */}
        <Typography>TODO</Typography>
      </Grid>
    </Grid>
  )
}

InternalState.propTypes = {
  stompblock: PropTypes.shape(stompblockShape).isRequired,
}

const mapStateToProps = ({ stompblock }) => ({ stompblock })

export default connect(mapStateToProps)(InternalState)
