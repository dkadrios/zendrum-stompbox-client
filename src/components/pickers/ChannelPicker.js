import React from 'react'
import PropTypes from 'prop-types'
import shortid from 'shortid'
import { withStyles, Select, MenuItem } from '@material-ui/core'
import { arraySequence } from '../../utils'

const styles = {
  select: {
    background: 'red',
  },
  selectMenu: {
    display: 'flex',
    flexFlow: 'row wrap',
    maxWidth: 150,
    justifyContent: 'center',
  },
  menuItem: {
    padding: 0,
    maxWidth: 35,
    minWidth: 35,
    justifyContent: 'center',
  },
  selectedMenuItem: {
    backgroundColor: '#c00000',
  },
}

const Items = classes => arraySequence(16)
  .map(i => i + 1)
  .map(i => (
    <MenuItem
      key={shortid.generate()}
      value={i}
      classes={classes}
    >
      {i}
    </MenuItem>
  ))

const ChannelPicker = ({ channel: value, onChange, classes }) => {
  const menuProps = {
    MenuListProps: { classes: { root: classes.selectMenu } },
  }

  return (
    <Select
      renderValue={val => `Channel ${val}`}
      onChange={({ target }) => onChange(target.value)}
      value={value}
      MenuProps={menuProps}
    >
      {Items({ root: classes.menuItem, selected: classes.selectedMenuItem })}
    </Select>
  )
}

ChannelPicker.propTypes = {
  channel: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ChannelPicker)
