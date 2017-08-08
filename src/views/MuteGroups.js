import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button } from 'react-toolbox/lib/button'
import styles from '../styles/muteGroups'
import MuteGroup from './MuteGroup'
import { MAX_MUTE_GROUPS } from '../midi'
import * as sysexActions from '../action-creators/sysex'

const MuteGroups = (props) => {
  const {
    muteGroups: { muteGroups },
    deleteMuteItem,
    addMuteItem,
    deleteMuteGroup,
    addMuteGroup,
  } = props

  return (
    <div className={styles.muteGroups}>
      {muteGroups.map((group, idx) => (
        <div key={idx}>
          <MuteGroup
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
      <small>Using {MAX_MUTE_GROUPS - muteGroups.length} of {MAX_MUTE_GROUPS}
        &nbsp;available groups</small>
    </div>
  )
}

MuteGroups.propTypes = {
  muteGroups: PropTypes.object.isRequired,
  deleteMuteItem: PropTypes.func.isRequired,
  addMuteItem: PropTypes.func.isRequired,
  deleteMuteGroup: PropTypes.func.isRequired,
  addMuteGroup: PropTypes.func.isRequired,
}

const mapStateToProps = ({ muteGroups }) => ({ muteGroups })
const mapDispatchToProps = dispatch => bindActionCreators(sysexActions, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MuteGroups)
