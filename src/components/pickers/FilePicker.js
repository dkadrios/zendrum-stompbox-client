import React from 'react'
import PropTypes from 'prop-types'
import { FilePicker as ReactFilePicker } from 'react-file-picker'

const FilePicker = (props) => {
  const { children, extensions, onChange, reportError } = props

  return (
    <div>
      <ReactFilePicker extensions={extensions} onChange={onChange} onError={reportError}>
        {children}
      </ReactFilePicker>
    </div>
  )
}

FilePicker.propTypes = {
  children: PropTypes.node.isRequired,
  extensions: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  reportError: PropTypes.func.isRequired,
}

export default FilePicker
