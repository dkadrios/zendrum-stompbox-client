import React from 'react'
import Avatar from 'react-toolbox/lib/avatar'
import Chip from 'react-toolbox/lib/chip'
import Instrument from '../images/Instrument'
import * as styles from '../styles/muteGroups.scss'

const MuteItem = props => {
  const { note, deleteMuteItem, groupIdx, itemIdx, muter, mapping } = props
  const { name, group } = mapping.find(item => item.note === note)

  return (
    <Chip
      deletable
      onDeleteClick={() => deleteMuteItem(groupIdx, muter, itemIdx)}
    >
      <Avatar icon={Instrument(group)} className={styles.instrument} />
      <strong>#{note}</strong> <span>{name}</span>
    </Chip>
  )
}

export default MuteItem
