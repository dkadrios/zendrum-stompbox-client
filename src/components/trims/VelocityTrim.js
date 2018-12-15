import React from 'react'
import PropTypes from 'prop-types'
import { withStyles, Typography } from '@material-ui/core'
import VelocityTrimControls from './VelocityTrimControls'
import Instrument from '../../images/Instrument'
import { trimShape } from '../../reducers/velocityTrim'

const styles = theme => console.log(theme) || {
  noteName: {
    padding: theme.spacing.unit / 2,
    width: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  header: {
    border: `1px outset ${theme.palette.grey[700]}`,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1px 5px 0 8px',
    borderRadius: 5,
    cursor: 'pointer',

    '& div:nth-child(2)': {
      fontSize: '90%',
      flexGrow: 0,
      color: theme.palette.text.secondary,
      textShadow: `0px 1px 1px ${theme.palette.background.default}`,
    },
    '& svg': {
      fill: theme.palette.text.primary,
      width: 20,
      height: 20,
      flexGrow: 0,
      margin: '2px 0 0 5px',
    },
  },
}

const handleKeyDown = (event, item, bank, userChangedTrimEnd) => {
  let delta = 0

  event.nativeEvent.preventDefault()
  switch (event.key) {
    case 'ArrowUp':
      delta = 1
      break
    case 'ArrowDown':
      delta = -1
      break
    case 'PageUp':
      delta = 5
      break
    case 'PageDown':
      delta = -5
      break
    case 'Enter':
      delta = 100
      break
    case 'Escape':
      delta = -100
      break
    default:
      break
  }

  if (delta !== 0) {
    delta += item.trim
    if (delta < 0) delta = 0
    if (delta > 100) delta = 100
    userChangedTrimEnd(item.note, delta, bank)
  }
}

const VelocityTrim = (props) => {
  const { item, bank, selected, playNote, selectTrim, userChangedTrimEnd, classes } = props
  const { note, trim, group, name } = item
  return (
    <section
      tabIndex={note}
      onKeyDown={e => handleKeyDown(e, item, bank, userChangedTrimEnd)}
      onMouseUp={() => (selected ? null : selectTrim(note))}
      className={selected ? classes.selected : ''}
      role="presentation"
    >
      <div
        className={classes.header}
        onMouseUp={() => playNote(note, Math.round(127 * (trim / 100)), bank)}
        role="button"
        tabIndex={note}
      >
        <Typography variant="h5">{note}</Typography>
        <Typography>{group}</Typography>
        <div>{Instrument(group)}</div>
      </div>
      <div
        className={classes.noteName}
        title={name}
      >
        {name}
      </div>
      <VelocityTrimControls {...props} />
    </section>
  )
}

VelocityTrim.propTypes = {
  item: trimShape.isRequired,
  selected: PropTypes.bool.isRequired,
  playNote: PropTypes.func.isRequired,
  selectTrim: PropTypes.func.isRequired,
  userChangedTrimEnd: PropTypes.func.isRequired,
  bank: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(VelocityTrim)
