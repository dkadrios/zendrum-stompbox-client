import React from 'react'
import PropTypes from 'prop-types'
import Visible from 'react-visible'
import { mappingSelector } from '../../styles/mapping'
import { mappingsShape } from '../../reducers/mapping'
import Cards from '../Cards'
import { settingsShape } from '../../reducers/settings'

const MappingSelector = (props) => {
  const { settings: { hasSoundBankSupport } } = props
  return (
    <div>
      <h2>Cards</h2>
      <section className={mappingSelector}>
        <p>
          Select which Micro SD card you have installed so that the proper instrument names are
          displayed.
        </p>
        <div>
          <Cards bank={0} {...props} />
          <Visible isVisible={hasSoundBankSupport}>
            <Cards bank={1} {...props} />
          </Visible>
        </div>
      </section>
    </div>
  )
}

MappingSelector.propTypes = {
  settings: PropTypes.shape(settingsShape).isRequired,
  mapping: PropTypes.shape(mappingsShape).isRequired,
  selectMapping: PropTypes.func.isRequired,
  deleteMapping: PropTypes.func.isRequired,
}

export default MappingSelector
