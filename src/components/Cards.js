import React from 'react'
import PropTypes from 'prop-types'
import Visible from 'react-visible'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import Tooltip from 'material-ui/Tooltip'
import Mapping from './settings/Mapping'
import FilePicker from './pickers/FilePicker'
import { mappingCont, mappingContScroller } from '../styles/mapping'
import { mappingsShape } from '../reducers/mapping'
import { settingsShape } from '../reducers/settings'

const Cards = ({
  mapping: { available, banks },
  settings: { hasSoundBankSupport },
  bank,
  selectMapping,
  reportError,
  importMapping,
  deleteMapping,
}) => {
  const { name: selected } = banks[bank]

  const handleFileUploaded = (FileObject) => {
    const reader = new FileReader()
    reader.onload = ({ target }) => {
      importMapping(
        //
        FileObject.name.split('.')[0],
        target.result.trim().split(/[\r\n]+/g),
      )
    }

    reader.onerror = ({ target }) => {
      reportError(`File could not be read! Code ${target.error.code}`)
    }

    reader.readAsText(FileObject)
  }

  return (
    <div className={mappingCont}>
      <Visible isVisible={hasSoundBankSupport}>
        <h1>Bank {String.fromCharCode(65 + bank)}</h1>
      </Visible>
      <div className={mappingContScroller}>
        {available.map(({ name, label }, idx) => (
          <Mapping
            key={`${bank}_${idx}`}
            idx={idx}
            label={label}
            name={name}
            onChange={nm => selectMapping(nm, bank)}
            deleteMapping={deleteMapping}
            selected={name === selected}
          />
        ))}

        <FilePicker extensions={['txt']} onChange={handleFileUploaded} reportError={reportError}>
          <Tooltip title="Import ZenEdit mapping...">
            <Button
              variant="fab"
              aria-label="add"
              style={{ position: 'relative', left: 20, top: 40, marginRight: 60 }}
            >
              <AddIcon />
            </Button>
          </Tooltip>
        </FilePicker>
      </div>
    </div>
  )
}

Cards.propTypes = {
  settings: PropTypes.shape(settingsShape).isRequired,
  mapping: PropTypes.shape(mappingsShape).isRequired,
  bank: PropTypes.number.isRequired,
  selectMapping: PropTypes.func.isRequired,
  reportError: PropTypes.func.isRequired,
  importMapping: PropTypes.func.isRequired,
  deleteMapping: PropTypes.func.isRequired,
}

export default Cards
