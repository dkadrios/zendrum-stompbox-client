import React from 'react'
import PropTypes from 'prop-types'
import ToolTipButton from '../HOC/ToolTipButton'
import buttonTheme from '../../styles/react-toolbox-theme/ToolButton.scss'
import styles from '../../styles/velocityTrimListFilter'

const capitalize = s => s[0].toUpperCase() + s.slice(1)

const ToolbarButton = ({ icon, view, selected, onClick }) => (
  <ToolTipButton
    theme={buttonTheme}
    icon={icon}
    primary={selected}
    raised
    tooltip={`${capitalize(view)} view`}
    className={selected ? styles.selected : ''}
    onClick={onClick}
  />
)

ToolbarButton.propTypes = {
  icon: PropTypes.string.isRequired,
  view: PropTypes.oneOf(['narrow', 'medium', 'wide']).isRequired,
  selected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default ToolbarButton
