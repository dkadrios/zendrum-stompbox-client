import React from 'react'
import PropTypes from 'prop-types'
import MuteItemNew from './MuteItemNew'
import { MAX_MUTEABLES_PER_GROUP, MAX_MUTERS_PER_GROUP } from '../../midi/'
import { mappingShape } from '../../reducers/mapping'
import { muteGroupShape } from '../../reducers/muteGroups'

const MuteGroupNewItem = (props) => {
  const { muter, group, ordinal, addMuteItem, mapping } = props
  const { muteables, muters } = group

  const max = () => (muter ? MAX_MUTERS_PER_GROUP : MAX_MUTEABLES_PER_GROUP)
  const avail = () =>
    muter ? MAX_MUTERS_PER_GROUP - muters.length : MAX_MUTEABLES_PER_GROUP - muteables.length

  return (
    <div>
      <MuteItemNew
        mapping={mapping}
        groupIdx={ordinal}
        muter={muter}
        addMuteItem={addMuteItem}
        disabled={avail() < 1}
      />
      <small>
        {max()} MAX ({avail()} available)
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
