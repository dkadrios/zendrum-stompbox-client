import React from 'react'
import PropTypes from 'prop-types'
import ToolTipButton from '../HOC/ToolTipButton'
import styles from '../../styles/velocityTrimListFilter'

const capitalize = s => s[0].toUpperCase() + s.slice(1)

const ToolbarButton = ({ icon, view, selected, onClick }) => (
  <ToolTipButton
    icon={icon}
    color={selected ? 'primary' : 'contrast'}
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
