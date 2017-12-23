import React from 'react'
import PropTypes from 'prop-types'
import Visible from 'react-visible'
import Mapping from './settings/Mapping'
import { mappingCont } from '../styles/mapping'
import { mappingsShape } from '../reducers/mapping'
import { settingsShape } from '../reducers/settings'

const Cards = ({
  mapping: { available, banks },
  settings: { hasSoundBankSupport },
  bank,
  selectMapping,
}) => {
  const { name: selected } = banks[bank]
  return (
    <div className={mappingCont}>
      <Visible isVisible={hasSoundBankSupport && __BANK_FEATURE__}>
        <h1>Bank {String.fromCharCode(65 + bank)}</h1>
      </Visible>
      {available.map(({ name, label }, idx) => (
        <Mapping
          key={idx}
          label={label}
          name={name}
          onChange={nm => selectMapping(nm, bank)}
          selected={name === selected}
        />
      ))}
    </div>
  )
}

Cards.propTypes = {
  settings: PropTypes.shape(settingsShape).isRequired,
  mapping: PropTypes.shape(mappingsShape).isRequired,
  bank: PropTypes.number.isRequired,
  selectMapping: PropTypes.func.isRequired,
}

export default Cards
