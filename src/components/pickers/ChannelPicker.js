import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import inlineStyle from '../../styles/channelPicker.js'
import { channelPicker, swatch } from '../../styles/channelPicker'
import { arraySequence } from '../../utils'

const itemStyle = {
  padding: 0,
}

const source = arraySequence(16)
  .map(i => i + 1)
  .map(i => (
    <MenuItem
      innerDivStyle={itemStyle}
      className={swatch}
      key={i}
      value={i}
      label={`Channel ${i}`}
      primaryText={i}
    />
  ))

const ChannelPicker = (props) => {
  const { className, channel: value, onChange, mini } = props
  const dropdownProps = {
    className: classNames(channelPicker, className, {
      mini,
    }),
    onChange: (event, key, val) => onChange(val),
    value,
    ...inlineStyle,
  }
  return <SelectField {...dropdownProps}>{source}</SelectField>
}

ChannelPicker.propTypes = {
  className: PropTypes.string,
  channel: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  mini: PropTypes.bool,
}

ChannelPicker.defaultProps = {
  className: '',
  mini: false,
}

export default ChannelPicker
