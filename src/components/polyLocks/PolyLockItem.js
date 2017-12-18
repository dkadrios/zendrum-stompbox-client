import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'
import SvgIcon from 'material-ui/SvgIcon'
import Instrument from '../../images/Instrument'
import { mappingShape } from '../../reducers/mapping'

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
  const { pitch, deletePolyLock, bank, mapping, classes } = props
  const { name, group } = mapping.find(item => item.note === pitch)

  return (
    <Chip
      onRequestDelete={() => deletePolyLock(bank, pitch)}
      label={`#${pitch} ${name}`}
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

PolyLockItem.propTypes = {
  bank: PropTypes.number.isRequired,
  pitch: PropTypes.number.isRequired,
  deletePolyLock: PropTypes.func.isRequired,
  mapping: PropTypes.arrayOf(PropTypes.shape(mappingShape)).isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PolyLockItem)
