/* @flow */
/* eslint-disable react/no-array-index-key */
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button } from 'react-toolbox/lib/button'
import styles from '../styles/muteGroups'
import MuteGroup from './MuteGroup'
import { MAX_MUTE_GROUPS } from '../midi'
import * as sysexActions from '../action-creators/sysex'
import type { MuteGroup as MuteGroupType, MuteGroupsState } from '../reducers/muteGroups'
import type { Dispatch } from '../types/Store'

type MuteGroupsType = { +muteGroups: MuteGroupsState }

type Props = {
  +muteGroups: { muteGroups: Array<MuteGroupType> },
  +deleteMuteItem: Function,
  +addMuteItem: Function,
  +deleteMuteGroup: Function,
  +addMuteGroup: Function,
}

const MuteGroups = (props: Props) => {
  const {
    muteGroups: { muteGroups },
    deleteMuteItem,
    addMuteItem,
    deleteMuteGroup,
    addMuteGroup,
  } = props

  return (
    <div className={styles.muteGroups}>
      {muteGroups.map((group, idx) =>
        (<div key={idx}>
          <MuteGroup
            group={group}
            ordinal={idx}
            deleteMuteItem={deleteMuteItem}
            addMuteItem={addMuteItem}
            deleteMuteGroup={deleteMuteGroup}
          />
        </div>),
      )}
      <Button icon="add" label="Create New Group" raised primary onClick={addMuteGroup} />
      <small>
        Using {MAX_MUTE_GROUPS - muteGroups.length} of {MAX_MUTE_GROUPS}
        &nbsp;available groups
      </small>
    </div>
  )
}

const mapStateToProps = ({ muteGroups }: MuteGroupsType) => ({ muteGroups })
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(sysexActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MuteGroups)
