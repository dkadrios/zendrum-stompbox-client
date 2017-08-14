/* @flow */
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import VelocityTrimList from './VelocityTrimList'
import VelocityTrimTips from './VelocityTrimTips'
import VelocityTrimListFilter from './VelocityTrimListFilter'
import * as sysexActions from '../action-creators/sysex'
import * as trimActions from '../action-creators/velocityTrimListFilter'
import styles from '../styles/velocityTrim'
import type { TrimsState } from '../reducers/velocityTrim'
import type { Dispatch } from '../types/Store'
import typeof {
  playNote as PlayNote,
  userChangedTrim as UserChangedTrim,
  userChangedTrimEnd as UserChangedTrimEnd,
} from '../action-creators/sysex'
import typeof { selectTrim as SelectTrim } from '../action-creators/velocityTrimListFilter'

type Props = {
  +velocityTrim: TrimsState,
  +playNote: PlayNote,
  +userChangedTrim: UserChangedTrim,
  +userChangedTrimEnd: UserChangedTrimEnd,
  +selectTrim: SelectTrim,
}

const VelocityTrimListView = (props: Props) => {
  const { velocityTrim } = props
  const { data, search, group, selectedNoteNum } = velocityTrim

  const searchRE = RegExp(search, 'i')

  const filteredTrims = data.filter(
    item =>
      (group === 'all' || group === item.group) &&
      (searchRE.test(item.name) || searchRE.test(String(item.note))),
  )

  return (
    <div className={styles.listContainer}>
      <VelocityTrimListFilter />
      <VelocityTrimTips active={!isNaN(selectedNoteNum)} />
      <VelocityTrimList items={filteredTrims} {...props} />
    </div>
  )
}

const mapStateToProps = ({ velocityTrim }: Props) => ({ velocityTrim })
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ ...sysexActions, ...trimActions }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(VelocityTrimListView)
