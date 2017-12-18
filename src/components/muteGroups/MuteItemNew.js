import React from 'react'
import PropTypes from 'prop-types'
import NotePicker from '../pickers/NotePicker'
import styles from '../../styles/muteGroups'
import { mappingShape } from '../../reducers/mapping'

const MuteItemNew = ({ mapping, disabled, groupIdx, muter, addMuteItem }) => (
  <div className={styles.newItemContainer}>
    <NotePicker
      mapping={mapping}
      onChange={val => addMuteItem(groupIdx, muter, val)}
      disabled={disabled}
    />
  </div>
)

MuteItemNew.propTypes = {
  addMuteItem: PropTypes.func.isRequired,
  groupIdx: PropTypes.number.isRequired,
  muter: PropTypes.bool.isRequired,
  mapping: PropTypes.arrayOf(PropTypes.shape(mappingShape)).isRequired,
  disabled: PropTypes.bool.isRequired,
}

export default MuteItemNew
