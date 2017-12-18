import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel'
import Switch from 'material-ui/Switch'
import Toolbar from 'material-ui/Toolbar'
import Tooltip from 'material-ui/Tooltip'
import Typography from 'material-ui/Typography'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'

const muiStyles = {
  summary: {
    margin: 0,
  },
  summaryRoot: {
    paddingLeft: 0,
  },
  title: {
    flex: 1,
  },
}

const Instructions = ({ header, body, classes, enabled, onChange }) => (
  <ExpansionPanel style={{ marginBottom: 15 }}>
    <ExpansionPanelSummary
      classes={{ content: classes.summary, root: classes.summaryRoot }}
      className={classes.summary}
      expandIcon={<ExpandMoreIcon />}
    >
      <Toolbar>
        <Typography color="inherit" className={classes.title}>
          {header} [Click for MORE]
        </Typography>
        <Tooltip title={enabled ? 'Disable' : 'Enable'}>
          <Switch
            checked={enabled}
            onClick={event => event.stopPropagation()}
            onChange={(event, value) => onChange(value)}
          />
        </Tooltip>
      </Toolbar>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>{body}</ExpansionPanelDetails>
  </ExpansionPanel>
)

Instructions.propTypes = {
  header: PropTypes.string.isRequired,
  body: PropTypes.node.isRequired,
  enabled: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(muiStyles)(Instructions)
