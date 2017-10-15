import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import VelocityTrimList from '../VelocityTrimList'
import VelocityTrimTips from '../VelocityTrimTips'
import VelocityTrimListFilter from '../VelocityTrimListFilter'
import * as sysexActions from '../../action-creators/sysex'
import * as trimActions from '../../action-creators/velocityTrimListFilter'
import styles from '../../styles/velocityTrim'

const VelocityTrimListView = props => {
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

const mapStateToProps = ({ velocityTrim }) => ({ velocityTrim })
const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...sysexActions, ...trimActions }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(
  VelocityTrimListView,
)
