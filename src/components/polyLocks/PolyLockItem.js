import React from 'react'
import PropTypes from 'prop-types'
import { withStyles, Avatar, Chip, SvgIcon } from '@material-ui/core'
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

const PolyLockItem = (props) => {
  const { pitch, deletePolyLock, idx, mapping, classes, disabled, bank } = props
  const { entries } = mapping.banks[bank]
  const { name, group } = entries.find(item => item.note === pitch)

  return (
    <Chip
      onDelete={disabled ? null : () => deletePolyLock(idx)}
      label={`#${pitch} ${name}`}
      className={classes.chip}
      classes={{ label: classes.label }}
      avatar={(
        <Avatar>
          <SvgIcon color="action">{Instrument(group)}</SvgIcon>
        </Avatar>
)}
    />
  )
}

PolyLockItem.propTypes = {
  idx: PropTypes.number.isRequired,
  pitch: PropTypes.number.isRequired,
  deletePolyLock: PropTypes.func.isRequired,
  mapping: PropTypes.shape(mappingsShape).isRequired,
  classes: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
  bank: PropTypes.number.isRequired,
}

export default withStyles(styles)(PolyLockItem)
