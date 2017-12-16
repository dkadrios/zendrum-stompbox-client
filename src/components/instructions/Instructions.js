import React from 'react'
import PropTypes from 'prop-types'
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'

const Instructions = ({ header, body }) => (
  <ExpansionPanel>
    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>{header}</ExpansionPanelSummary>
    <ExpansionPanelDetails>{body}</ExpansionPanelDetails>
  </ExpansionPanel>
)

Instructions.propTypes = {
  header: PropTypes.string.isRequired,
  body: PropTypes.node.isRequired,
}

export default Instructions
