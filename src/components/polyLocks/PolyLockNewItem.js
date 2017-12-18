import React from 'react'
import PropTypes from 'prop-types'
import NotePicker from '../pickers/NotePicker'
import styles from '../../styles/polyLocks'
import { mappingShape } from '../../reducers/mapping'

const PolyLockNewItem = ({ bank, mapping, disabled, addPolyLock }) => (
  <div className={styles.newItemContainer}>
    <NotePicker mapping={mapping} onChange={val => addPolyLock(bank, val)} disabled={disabled} />
  </div>
)

PolyLockNewItem.propTypes = {
  bank: PropTypes.number.isRequired,
  addPolyLock: PropTypes.func.isRequired,
  mapping: PropTypes.arrayOf(PropTypes.shape(mappingShape)).isRequired,
  disabled: PropTypes.bool.isRequired,
}

export default PolyLockNewItem
