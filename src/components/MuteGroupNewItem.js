import React from 'react'
import PropTypes from 'prop-types'
import MuteItemNew from './MuteItemNew'
import { MAX_MUTEABLES_PER_GROUP, MAX_MUTERS_PER_GROUP } from '../midi/'
import { mappingShape } from '../reducers/mapping'
import { muteGroupShape } from '../reducers/muteGroups'

const MuteGroupNewItem = (props) => {
  const { muter, group, ordinal, addMuteItem, mapping } = props
  const { muteables, muters } = group

  return (
    <div>
      <MuteItemNew mapping={mapping} groupIdx={ordinal} muter={muter} addMuteItem={addMuteItem} />
      <small>
        {muter ? MAX_MUTERS_PER_GROUP : MAX_MUTEABLES_PER_GROUP} MAX ({muter
          ? MAX_MUTERS_PER_GROUP - muters.length
          : MAX_MUTEABLES_PER_GROUP - muteables.length}{' '}
        available)
      </small>
    </div>
  )
}

MuteGroupNewItem.propTypes = {
  muter: PropTypes.bool.isRequired,
  group: PropTypes.shape(muteGroupShape).isRequired,
  ordinal: PropTypes.number.isRequired,
  addMuteItem: PropTypes.func.isRequired,
  mapping: PropTypes.arrayOf(PropTypes.shape(mappingShape)).isRequired,
}

export default MuteGroupNewItem
