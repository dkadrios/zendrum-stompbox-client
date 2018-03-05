import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Paper from 'material-ui/Paper'
import MappingSelector from '../settings/MappingSelector'
import Preferences from '../settings/Preferences'
import FactoryReset from '../settings/FactoryReset'
import MidiSettings from '../settings/MidiSettings'
import styles from '../../styles/settings'
import paperStyle from '../../styles/paper'
import * as settingActions from '../../action-creators/settings'
import * as mappingActions from '../../action-creators/mapping'
import * as stompblockActions from '../../action-creators/stompblock'
import { settingsShape } from '../../reducers/settings'
import { mappingsShape } from '../../reducers/mapping'

const Settings = (props) => {
  const { settings: { hasVersionThreeFirmware } } = props
  return (
    <div className={styles.settingsCont}>
      <div className={styles.settings}>
        <Paper style={paperStyle}>
          <MappingSelector {...props} />
        </Paper>

        <Paper style={paperStyle}>
          <Preferences {...props} />
        </Paper>

        {hasVersionThreeFirmware && (
          <Paper style={paperStyle}>
            <MidiSettings {...props} />
          </Paper>
        )}

        <FactoryReset {...props} />
      </div>
    </div>
  )
}

Settings.propTypes = {
  settings: PropTypes.shape(settingsShape).isRequired,
  mapping: PropTypes.shape(mappingsShape).isRequired,
  setMuteEnabled: PropTypes.func.isRequired,
  setThruEnabled: PropTypes.func.isRequired,
  confirmFactoryReset: PropTypes.func.isRequired,
  performFactoryReset: PropTypes.func.isRequired,
  selectMapping: PropTypes.func.isRequired,
  deleteMapping: PropTypes.func.isRequired,
}

const mapStateToProps = ({ settings, mapping }) => ({ settings, mapping })
const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...settingActions, ...mappingActions, ...stompblockActions }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
