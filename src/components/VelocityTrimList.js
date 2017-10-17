import React from 'react'
import PropTypes from 'prop-types'
import VelocityTrim from './VelocityTrim'
import styles from '../styles/velocityTrim'
import { trimShape } from '../reducers/velocityTrim'

const VelocityTrimList = (props) => {
  const { items, velocityTrim } = props
  const { listView, selectedNoteNum } = velocityTrim

  return (
    <div className={styles.list}>
      <ul className={styles[`${listView}View`]}>
        {items.map(item => (
          <VelocityTrim
            key={item.note}
            item={item}
            selected={item.note === selectedNoteNum}
            {...props}
          />
        ))}
      </ul>
    </div>
  )
}

VelocityTrimList.propTypes = {
  items: PropTypes.arrayOf(trimShape).isRequired,
  velocityTrim: PropTypes.shape({
    listView: PropTypes.string.isRequired,
    selectedNoteNum: PropTypes.number.isRequired,
  }).isRequired,
}

export default VelocityTrimList
