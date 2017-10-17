import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import VelocityTrimList from '../VelocityTrimList'
import VelocityTrimTips from '../VelocityTrimTips'
import VelocityTrimListFilter from '../VelocityTrimListFilter'
import * as trimActions from '../../action-creators/velocityTrim'
import * as trimFilterActions from '../../action-creators/velocityTrimListFilter'
import styles from '../../styles/velocityTrim'
import { velocityTrimShape } from '../../reducers/velocityTrim'

const VelocityTrimListView = (props) => {
  const { velocityTrim } = props
  const { data, search, group, selectedNoteNum } = velocityTrim

  const searchRE = RegExp(search, 'i')

  const filteredTrims = data.filter(item =>
    (group === 'all' || group === item.group) &&
      (searchRE.test(item.name) || searchRE.test(String(item.note))))

  return (
    <div className={styles.listContainer}>
      <VelocityTrimListFilter />
      <VelocityTrimTips active={!Number.isNaN(selectedNoteNum)} />
      <VelocityTrimList items={filteredTrims} {...props} />
    </div>
  )
}

VelocityTrimListView.propTypes = {
  velocityTrim: velocityTrimShape.isRequired,
}

const mapStateToProps = ({ velocityTrim }) => ({ velocityTrim })
const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...trimActions, ...trimFilterActions }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(VelocityTrimListView)
