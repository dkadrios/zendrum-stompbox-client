import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import VelocityTrimList from '../trims/VelocityTrimList'
import VelocityTrimTips from '../trims/VelocityTrimTips'
import VelocityTrimListFilter from '../trims/VelocityTrimListFilter'
import * as trimActions from '../../action-creators/velocityTrim'
import * as trimFilterActions from '../../action-creators/velocityTrimListFilter'
import styles from '../../styles/velocityTrim'
import { velocityTrimShape } from '../../reducers/velocityTrim'
import { mappingsShape } from '../../reducers/mapping'

const VelocityTrimListView = (props) => {
  const { velocityTrim, mapping } = props
  const { banks, bank, search, group, selectedNoteNum } = velocityTrim
  const { banks: mappingBanks, available } = mapping

  const mappingName = available.reduce(
    (acc, { name, label }) => (name === mappingBanks[bank].name ? label : acc),
    '',
  )

  /**
   * ZenEdit and Restomp use different group names.
   * Search by either when grouping.
   */
  const alternateGroupNames = {
    Toms: 'Tom',
    Snares: 'Snare',
    Kicks: 'Kick',
    Cymbals: 'Cymbal',
    Hats: 'Hi-hat',
    Rides: 'Ride',
    Perc: 'Percussion',
  }

  const searchRE = RegExp(search, 'i')

  const groupMatch = item =>
    group === 'all' || group === item.group || group === alternateGroupNames[item.group]

  const filteredTrims = banks[bank].filter(item =>
    groupMatch(item) && //
      (searchRE.test(item.name) || searchRE.test(String(item.note))))

  return (
    <div className={styles.listContainer}>
      <VelocityTrimListFilter />
      <VelocityTrimTips active={!Number.isNaN(selectedNoteNum)} mappingName={mappingName} />
      <VelocityTrimList items={filteredTrims} {...props} />
    </div>
  )
}

VelocityTrimListView.propTypes = {
  velocityTrim: velocityTrimShape.isRequired,
  mapping: PropTypes.shape(mappingsShape).isRequired,
}

const mapStateToProps = ({ velocityTrim, mapping }) => ({ velocityTrim, mapping })
const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...trimActions, ...trimFilterActions }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(VelocityTrimListView)
