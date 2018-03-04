import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Button from 'material-ui/Button'
import Add from 'material-ui-icons/Add'
import styles from '../../styles/muteGroups'
import MuteGroup from '../muteGroups/MuteGroup'
import MuteGroupInstructions from '../instructions/MuteGroupInstructions'
import { MAX_MUTE_GROUPS } from '../../midi/'
import * as muteGroupActions from '../../action-creators/muteGroups'
import * as settingsActions from '../../action-creators/settings'
import { muteGroupsShape } from '../../reducers/muteGroups'
import { settingsShape } from '../../reducers/settings'
import { mappingsShape } from '../../reducers/mapping'

const MuteGroups = (props) => {
  const {
    muteGroups: { data, hasVersionThreeFirmware, hasSoundBankSupport },
    mapping,
    settings: { muteGroupsEnabled },
    deleteMuteItem,
    addMuteItem,
    deleteMuteGroup,
    addMuteGroup,
    changeBank,
    setMuteGroupsEnabled,
  } = props

  return (
    <div className={styles.muteGroupsContainer}>
      <div className={styles.muteGroups}>
        <MuteGroupInstructions enabled={muteGroupsEnabled} onChange={setMuteGroupsEnabled} />
        {data.map((group, idx) => (
          <div key={idx}>
            <MuteGroup
              disabled={!muteGroupsEnabled}
              mapping={mapping}
              group={group}
              ordinal={idx}
              deleteMuteItem={deleteMuteItem}
              addMuteItem={addMuteItem}
              deleteMuteGroup={deleteMuteGroup}
              changeBank={changeBank}
              hasVersionThreeFirmware={hasVersionThreeFirmware}
              hasSoundBankSupport={hasSoundBankSupport}
            />
          </div>
        ))}
        <Button
          variant="raised"
          color="primary"
          onClick={addMuteGroup}
          disabled={!muteGroupsEnabled}
        >
          <Add />
          Create New Group
        </Button>
        <small>
          Using {MAX_MUTE_GROUPS - data.length} of {MAX_MUTE_GROUPS}
          &nbsp;available groups
        </small>
      </div>
    </div>
  )
}

MuteGroups.propTypes = {
  muteGroups: PropTypes.shape(muteGroupsShape).isRequired,
  mapping: PropTypes.shape(mappingsShape).isRequired,
  settings: PropTypes.shape(settingsShape).isRequired,
  deleteMuteItem: PropTypes.func.isRequired,
  addMuteItem: PropTypes.func.isRequired,
  deleteMuteGroup: PropTypes.func.isRequired,
  addMuteGroup: PropTypes.func.isRequired,
  changeBank: PropTypes.func.isRequired,
  setMuteGroupsEnabled: PropTypes.func.isRequired,
}

const mapStateToProps = ({ muteGroups, mapping, settings }) => ({ muteGroups, mapping, settings })
const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...muteGroupActions, ...settingsActions }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MuteGroups)
