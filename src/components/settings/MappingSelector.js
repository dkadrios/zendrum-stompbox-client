import React from 'react'
import PropTypes from 'prop-types'
import Mapping from './Mapping'
import { mappingSelector, mappingCont } from '../../styles/mapping'
import { mappingsShape } from '../../reducers/mapping'

const MappingSelector = ({ mapping: { available, name: selected }, selectMapping }) => (
  <div>
    <h2>Card</h2>
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
            onChange={selectMapping}
            selected={name === selected}
          />
        ))}
      </div>
    </section>
  </div>
)

MappingSelector.propTypes = {
  mapping: PropTypes.shape(mappingsShape).isRequired,
  selectMapping: PropTypes.func.isRequired,
}

export default MappingSelector
