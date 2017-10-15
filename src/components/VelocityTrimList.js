import React from 'react'
import VelocityTrim from './VelocityTrim'
import styles from '../styles/velocityTrim'

const VelocityTrimList = props => {
  const { items, velocityTrim } = props
  const { listView, selectedNoteNum } = velocityTrim

  return (
    <div className={styles.list}>
      <ul className={styles[`${listView}View`]}>
        {items.map(item => (
          <VelocityTrim
            key={item.note}
            item={item}
            styles={styles}
            selected={item.note === selectedNoteNum}
            {...props}
          />
        ))}
      </ul>
    </div>
  )
}

export default VelocityTrimList
