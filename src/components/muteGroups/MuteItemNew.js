import React from 'react'
import PropTypes from 'prop-types'
import NotePicker from '../pickers/NotePicker'
import styles from '../../styles/muteGroups'
import { mappingsShape } from '../../reducers/mapping'

const MuteItemNew = ({ mapping, disabled, groupIdx, muter, addMuteItem, bank }) => (
  <div className={styles.newItemContainer}>
    <NotePicker
      mapping={mapping}
      bank={bank}
      onChange={val => addMuteItem(groupIdx, muter, val)}
      disabled={disabled}
    />
  </div>
)

MuteItemNew.propTypes = {
  addMuteItem: PropTypes.func.isRequired,
  groupIdx: PropTypes.number.isRequired,
  muter: PropTypes.bool.isRequired,
  bank: PropTypes.number.isRequired,
  mapping: PropTypes.shape(mappingsShape).isRequired,
  disabled: PropTypes.bool.isRequired,
}

export default MuteItemNew
