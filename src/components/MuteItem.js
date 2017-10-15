/* @flow */
import React from 'react'
import Avatar from 'react-toolbox/lib/avatar'
import Chip from 'react-toolbox/lib/chip'
import Instrument from '../images/Instrument'
import * as styles from '../styles/muteGroups.scss'
import type { MappingEntry } from '../types/Mappings'
import typeof { deleteMuteItem as DeleteMuteItem } from '../action-creators/sysex'

type Props = {
  +item: MappingEntry,
  +deleteMuteItem: DeleteMuteItem,
  +groupIdx: number,
  +itemIdx: number,
  +muter: boolean,
}

const MuteItem = (props: Props) => {
  const { note, deleteMuteItem, groupIdx, itemIdx, muter, mapping } = props
  const { name, group } = mapping.find(item => item.note === note)

  return (
    <Chip deletable onDeleteClick={() => deleteMuteItem(groupIdx, muter, itemIdx)}>
      <Avatar icon={Instrument(group)} className={styles.instrument} />
      <strong>#{note}</strong> <span>{name}</span>
    </Chip>
  )
}

export default MuteItem
