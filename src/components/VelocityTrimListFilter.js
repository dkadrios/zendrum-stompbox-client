import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import DebounceInput from 'react-debounce-input'
import Dropdown from 'react-toolbox/lib/dropdown'
import availableGroups from '../mappings/'
import Btn from '../components/HOC/ToolbarButton'
import * as filterActions from '../action-creators/velocityTrimListFilter'
import styles from '../styles/velocityTrimListFilter'
import dropdownTheme from '../styles/react-toolbox-theme/Dropdown.scss'

const VelocityTrimListFilter = (props) => {
  const { velocityTrim, searchTrims, changeGroup, changeListView } = props
  const { search, group, listView } = velocityTrim

  return (
    <div className={styles.filters}>
      <DebounceInput
        type="search"
        value={search}
        placeholder="Filter by name or #"
        debounceTimeout={200}
        onChange={e => searchTrims(e.target.value)}
      />

      <Dropdown
        theme={dropdownTheme}
        className={styles.groups}
        auto
        onChange={value => changeGroup(value)}
        source={availableGroups}
        value={group}
      />

      <div className={styles.buttonGroup}>
        <Btn
          icon="view_stream"
          view="narrow"
          selected={listView === 'narrow'}
          onClick={() => changeListView('narrow')}
        />
        <Btn
          icon="view_module"
          view="medium"
          selected={listView === 'medium'}
          onClick={() => changeListView('medium')}
        />
        <Btn
          icon="view_comfy"
          view="wide"
          selected={listView === 'wide'}
          onClick={() => changeListView('wide')}
        />
      </div>
    </div>
  )
}

VelocityTrimListFilter.propTypes = {
  velocityTrim: PropTypes.shape({
    search: PropTypes.string.isRequired,
    group: PropTypes.string.isRequired,
    listView: PropTypes.oneOf(['narrow', 'medium', 'wide']).isRequired,
  }).isRequired,
  searchTrims: PropTypes.func.isRequired,
  changeGroup: PropTypes.func.isRequired,
  changeListView: PropTypes.func.isRequired,
}

const mapStateToProps = ({ velocityTrim }) => ({ velocityTrim })
const mapDispatchToProps = dispatch => bindActionCreators(filterActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(VelocityTrimListFilter)
