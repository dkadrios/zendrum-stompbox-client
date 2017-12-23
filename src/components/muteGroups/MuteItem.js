import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'
import SvgIcon from 'material-ui/SvgIcon'
import Instrument from '../../images/Instrument'
import { mappingsShape } from '../../reducers/mapping'

const styles = {
  chip: {
    margin: 2,
    minWidth: 200,
  },
  label: {
    width: '100%',
  },
}

const MuteItem = (props) => {
  const {
    note,
    deleteMuteItem,
    groupIdx,
    itemIdx,
    muter,
    mapping: { banks },
    bank,
    classes,
    disabled,
  } = props

  const { entries } = banks[bank] || []
  const { name, group } = entries.find(item => item.note === note) || {}

  return (
    <Chip
      onRequestDelete={disabled ? null : () => deleteMuteItem(groupIdx, muter, itemIdx)}
      label={`#${note} ${name}`}
      className={classes.chip}
      classes={{ label: classes.label }}
      avatar={
        <Avatar>
          <SvgIcon color="action">{Instrument(group)}</SvgIcon>
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
  mapping: PropTypes.shape(mappingsShape).isRequired,
  bank: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
}

export default withStyles(styles)(MuteItem)
