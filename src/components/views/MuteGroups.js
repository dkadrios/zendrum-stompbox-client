import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button } from 'react-toolbox/lib/button'
import styles from '../../styles/muteGroups'
import MuteGroup from '../MuteGroup'
import { MAX_MUTE_GROUPS } from '../../midi'
import * as sysexActions from '../../action-creators/sysex'

const MuteGroups = props => {
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
        <Button
          icon="add"
          label="Create New Group"
          raised
          primary
          onClick={addMuteGroup}
        />
        <small>
          Using {MAX_MUTE_GROUPS - data.length} of {MAX_MUTE_GROUPS}
          &nbsp;available groups
        </small>
      </div>
    </div>
  )
}

const mapStateToProps = ({ muteGroups, mapping }) => ({ muteGroups, mapping })
const mapDispatchToProps = dispatch =>
  bindActionCreators(sysexActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MuteGroups)
