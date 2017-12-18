/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import PropTypes from 'prop-types'
import omit from 'lodash/omit'
import { withStyles } from 'material-ui/styles'
import Instructions from './Instructions'

const styles = {
  cont: {
    width: 630,
    maxWidth: 630,
  },
}

const header = 'Here you can define voices that should be silenced when others are played.'
const body = () => (
  <div>
    <p>
      Your STOMPBLOCK can contain up to 4 different 'mute groups'. These are collections of voices
      that should be muted whenever certain other voices are played.
    </p>
    <p>
      The factory default groups are set up to handle your hi-hats. They ensure that any ringing
      hats are muted when you play a closed note or the pedal 'chick'.
    </p>
    <p>
      You are free to modify these settings or to create your own groupings to mute other
      instruments.
    </p>
  </div>
)

const MuteGroupInstructions = props => (
  <div className={props.classes.cont}>
    <Instructions header={header} body={body()} {...omit(props, ['classes'])} />
  </div>
)

MuteGroupInstructions.propTypes = {
  classes: PropTypes.object.isRequired,
  enabled: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default withStyles(styles)(MuteGroupInstructions)
