/* @flow */
import React from 'react'
import Avatar from 'react-toolbox/lib/avatar'
import Chip from 'react-toolbox/lib/chip'
import Instrument from '../images/Instrument'
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
  const { item, deleteMuteItem, groupIdx, itemIdx, muter } = props
  const { note, name, group } = item

  return (
    <Chip deletable onDeleteClick={() => deleteMuteItem(groupIdx, muter, itemIdx)}>
      <Avatar icon={Instrument(group)} style={{ backgroundColor: '#666' }} />
      <strong>#{note}</strong> <span>{name}</span>
    </Chip>
  )
}

export default MuteItem
