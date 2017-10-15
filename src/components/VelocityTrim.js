import React from 'react'
import VelocityTrimControls from './VelocityTrimControls'
import Instrument from '../images/Instrument'

const handleKeyDown = (event, item, userChangedTrimEnd) => {
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
    userChangedTrimEnd(item.note, delta)
  }
}

const VelocityTrim = props => {
  const {
    item,
    styles,
    selected,
    playNote,
    selectTrim,
    userChangedTrimEnd,
  } = props
  return (
    <li
      tabIndex={item.note}
      onKeyDown={e => handleKeyDown(e, item, userChangedTrimEnd)}
      onMouseUp={() => (selected ? null : selectTrim(item.note))}
      className={selected ? styles.selected : ''}
    >
      <div
        className={styles.header}
        onMouseUp={() => playNote(item.note, 127)}
        role="button"
        tabIndex={item.note}
      >
        <div>{item.note}</div>
        <div>{item.group}</div>
        <div>{Instrument(item.group)}</div>
      </div>
      <div className={styles.noteName} title={item.name}>
        {item.name}
      </div>
      <VelocityTrimControls {...props} />
    </li>
  )
}

export default VelocityTrim
