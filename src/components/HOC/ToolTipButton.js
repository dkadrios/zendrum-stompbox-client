import React from 'react'
import Tooltip from 'react-toolbox/lib/tooltip'
import Button from 'react-toolbox/lib/button'

const ToolTipButton = Tooltip(props => <Button {...props} />)

export default ToolTipButton
