import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button } from 'react-toolbox/lib/button'
import styles from '../../styles/muteGroups'
import MuteGroup from '../muteGroups/MuteGroup'
import { MAX_MUTE_GROUPS } from '../../midi/'
import * as muteGroupActions from '../../action-creators/muteGroups'
import { muteGroupsShape } from '../../reducers/muteGroups'

const MuteGroups = (props) => {
  const {
    muteGroups: { data },
    mapping: { entries },
    deleteMuteItem,
    addMuteItem,
    deleteMuteGroup,
    addMuteGroup,
  } = props

  return (
    <div className={styles.muteGroupsContainer}>
      <div className={styles.muteGroups}>
        {data.map((group, idx) => (
          <div key={idx}>
            <MuteGroup
              mapping={entries}
              group={group}
              ordinal={idx}
              deleteMuteItem={deleteMuteItem}
              addMuteItem={addMuteItem}
              deleteMuteGroup={deleteMuteGroup}
            />
          </div>
        ))}
        <Button icon="add" label="Create New Group" raised primary onClick={addMuteGroup} />
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
  mapping: PropTypes.shape({ entries: PropTypes.array.isRequired }).isRequired,
  deleteMuteItem: PropTypes.func.isRequired,
  addMuteItem: PropTypes.func.isRequired,
  deleteMuteGroup: PropTypes.func.isRequired,
  addMuteGroup: PropTypes.func.isRequired,
}

const mapStateToProps = ({ muteGroups, mapping }) => ({ muteGroups, mapping })
const mapDispatchToProps = dispatch => bindActionCreators(muteGroupActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MuteGroups)
