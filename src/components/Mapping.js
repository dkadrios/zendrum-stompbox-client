import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import MicroSD from '../images/MicroSD.svg.js'
import ZendrumLogo from '../images/ZendrumLogo.svg.js'
import UserDefined from '../images/UserDefined.svg.js'
import styles from '../styles/mapping'

const StickerRender = Img => <Img />
const Sticker = name => StickerRender(name === 'stompblock' ? ZendrumLogo : UserDefined)

const Mapping = (props) => {
  const { selected, name, label, onChange } = props
  const mappingClass = classNames({ [styles.mapping]: true, [styles.selected]: selected })
  return (
    <div className={mappingClass}>
      <div onClick={() => onChange(name)} role="presentation">
        <MicroSD />
        {Sticker(name)}
        <p>{label}</p>
      </div>
    </div>
  )
}

Mapping.propTypes = {
  selected: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Mapping
