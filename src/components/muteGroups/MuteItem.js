import React from 'react'
import PropTypes from 'prop-types'
import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'
import SvgIcon from 'material-ui/SvgIcon'
import Instrument from '../../images/Instrument'
import { mappingShape } from '../../reducers/mapping'

const MuteItem = (props) => {
  const { note, deleteMuteItem, groupIdx, itemIdx, muter, mapping } = props
  const { name, group } = mapping.find(item => item.note === note)

  return (
    <Chip
      onRequestDelete={() => deleteMuteItem(groupIdx, muter, itemIdx)}
      label={`#${note} ${name}`}
      avatar={
        <Avatar>
          <SvgIcon>{Instrument(group)}</SvgIcon>
        </Avatar>
      }
    />
  )
}

MuteItem.propTypes = {
  note: PropTypes.number.isRequired,
  deleteMuteItem: PropTypes.func.isRequired,
  groupIdx: PropTypes.number.isRequired,
  itemIdx: PropTypes.number.isRequired,
  muter: PropTypes.bool.isRequired,
  mapping: PropTypes.arrayOf(PropTypes.shape(mappingShape)).isRequired,
}

export default MuteItem
