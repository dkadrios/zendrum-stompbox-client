import React from 'react'
import PropTypes from 'prop-types'
import Avatar from 'react-toolbox/lib/avatar'
import Chip from 'react-toolbox/lib/chip'
import Instrument from '../images/Instrument'

const MuteItem = (props) => {
  const {
    item,
    deleteMuteItem,
    groupIdx,
    itemIdx,
    muter,
  } = props

  const { note, name, group } = item

  return (
    <Chip deletable onDeleteClick={() => deleteMuteItem(groupIdx, muter, itemIdx)}>
      <Avatar icon={Instrument(group)} style={{ backgroundColor: '#666' }} />
      <strong>#{note}</strong> <span>{name}</span>
    </Chip>
  )
}

MuteItem.propTypes = {
  item: PropTypes.object.isRequired,
  deleteMuteItem: PropTypes.func.isRequired,
  groupIdx: PropTypes.number.isRequired,
  itemIdx: PropTypes.number.isRequired,
  muter: PropTypes.bool.isRequired,
}

export default MuteItem
