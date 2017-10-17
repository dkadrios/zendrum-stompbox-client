import React from 'react'
import PropTypes from 'prop-types'
import Mapping from './Mapping'
import { mappingSelector, mappingCont } from '../styles/mapping'

const MappingSelector = (props) => {
  const { selected, available, onChange } = props
  return (
    <section className={mappingSelector}>
      <p>
        Select which Micro SD card you have installed so that the proper instrument names are
        displayed.
      </p>
      <div className={mappingCont}>
        {available.map(({ name, label }, idx) => (
          <Mapping
            key={idx}
            label={label}
            name={name}
            onChange={onChange}
            selected={name === selected}
          />
        ))}
      </div>
    </section>
  )
}

MappingSelector.propTypes = {
  selected: PropTypes.bool.isRequired,
  available: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    label: PropTypes.string,
  })).isRequired,
  onChange: PropTypes.func.isRequired,
}

export default MappingSelector
