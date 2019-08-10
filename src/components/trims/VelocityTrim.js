import React from 'react'
import PropTypes from 'prop-types'
import VelocityTrimControls from './VelocityTrimControls'
import Instrument from '../../images/Instrument'
import styles from '../../styles/velocityTrim'
import { trimShape } from '../../reducers/velocityTrim'

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
  const { item, bank, selected, playNote, selectTrim, userChangedTrimEnd } = props
  const { note, trim, group, name } = item

  return (
    <section
      tabIndex={note}
      onKeyDown={e => handleKeyDown(e, item, bank, userChangedTrimEnd)}
      onMouseUp={() => (selected ? null : selectTrim(note))}
      className={selected ? styles.selected : ''}
      role="presentation"
    >
      <div
        className={styles.header}
        onMouseUp={() => playNote(note, Math.round(127 * (trim / 100)), bank)}
        role="button"
        tabIndex={note}
      >
        <div>{note}</div>
        <div>{group}</div>
        <div>{Instrument(group)}</div>
      </div>
      <div
        className={styles.noteName}
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
}

export default VelocityTrim
