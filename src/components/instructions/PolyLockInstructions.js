/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core'
import Instructions from './Instructions'

const styles = {
  cont: {
    width: 630,
    maxWidth: 630,
  },
}

const header = 'Here you can define which notes if any should not be recycled by the engine.'
const body = () => (
  <div>
    <p>Your STOMPBLOCK has a maximum polyphony of 14 voices.</p>
    <p>
      Once polyphony has maxed out, it will begin to recycle slots by muting individual notes based on an internal
      algorithm. This typically works well enough for basic drums and percussion, however samples with long tails, such
      as cymbals, can sound 'chopped off' and unrealistic.
    </p>
    <p>
      You can prevent this by marking up to 16 instruments that should never be cut short due to polyphony. This should
      be used strategically and sparingly since the overall polyphony level drops during the time these samples are
      playing. Good candidates for this feature are crash cymbals and open hi-hats.
    </p>
    <p>You should avoid using this feature for time keeping instruments or any instrument that is used frequently.</p>
  </div>
)

const PolyLockInstructions = ({ classes, ...rest }) => (
  <div className={classes.cont}>
    <Instructions header={header} body={body()} {...rest} />
  </div>
)

PolyLockInstructions.propTypes = {
  classes: PropTypes.object.isRequired,
  enabled: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default withStyles(styles)(PolyLockInstructions)
