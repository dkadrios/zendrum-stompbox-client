import React from 'react'
import PropTypes from 'prop-types'
import NotePicker from '../pickers/NotePicker'
import styles from '../../styles/polyLocks'
import { mappingsShape } from '../../reducers/mapping'

const PolyLockNewItem = ({ bank, mapping, disabled, addPolyLock }) => (
  <div className={styles.newItemContainer}>
    <NotePicker
      mapping={mapping}
      bank={bank}
      onChange={val => addPolyLock(bank, val)}
      disabled={disabled}
    />
  </div>
)

PolyLockNewItem.propTypes = {
  bank: PropTypes.number.isRequired,
  addPolyLock: PropTypes.func.isRequired,
  mapping: PropTypes.shape(mappingsShape).isRequired,
  disabled: PropTypes.bool.isRequired,
}

export default PolyLockNewItem
