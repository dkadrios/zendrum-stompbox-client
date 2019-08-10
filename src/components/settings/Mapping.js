import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import DeleteMappingButton from './DeleteMappingButton'
import MicroSD from '../../images/MicroSD.svg.js'
import ZendrumLogo from '../../images/ZendrumLogo.svg.js'
import UserDefined from '../../images/UserDefined.svg.js'
import styles from '../../styles/mapping'

const StickerRender = Img => <Img />
const Sticker = name => StickerRender(name === 'stompblock' ? ZendrumLogo : UserDefined)

const Mapping = (props) => {
  const { selected, name, label, onChange, idx, deleteMapping } = props
  const mappingClass = classNames({ [styles.mapping]: true, [styles.selected]: selected })

  return (
    <div className={mappingClass}>
      <div
        onClick={() => onChange(name)}
        role="presentation"
      >
        <MicroSD />
        {Sticker(name)}
        <p>{label}</p>
        {idx > 1 && <DeleteMappingButton
          deleteMapping={deleteMapping}
          name={name}
        />}
      </div>
    </div>
  )
}

Mapping.propTypes = {
  selected: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  deleteMapping: PropTypes.func.isRequired,
  idx: PropTypes.number.isRequired,
}

export default Mapping
