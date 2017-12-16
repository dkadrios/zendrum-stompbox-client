import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import DebounceInput from 'react-debounce-input'
import Dropdown from 'react-toolbox/lib/dropdown'
import Switch from 'react-toolbox/lib/switch'
import availableGroups from '../../mappings/'
import Btn from '../../components/HOC/ToolbarButton'
import Tooltipped from '../../components/HOC/Tooltipped'
import * as filterActions from '../../action-creators/velocityTrimListFilter'
import { velocityTrimShape } from '../../reducers/velocityTrim'
import styles from '../../styles/velocityTrimListFilter'

const VelocityTrimListFilter = (props) => {
  const { velocityTrim, searchTrims, changeGroup, changeListView, setChaseEnabled } = props
  const { search, group, listView, chaseEnabled } = velocityTrim

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

      <div className={styles.midiChase}>
        <Tooltipped tooltip="Highlight any notes played on Zendrum or other instrument (requires THRU be enabled)">
          <Switch checked={chaseEnabled} label="MIDI Chase" onChange={setChaseEnabled} />
        </Tooltipped>
      </div>
    </div>
  )
}

VelocityTrimListFilter.propTypes = {
  velocityTrim: velocityTrimShape.isRequired,
  searchTrims: PropTypes.func.isRequired,
  changeGroup: PropTypes.func.isRequired,
  changeListView: PropTypes.func.isRequired,
  setChaseEnabled: PropTypes.func.isRequired,
}

const mapStateToProps = ({ velocityTrim }) => ({ velocityTrim })
const mapDispatchToProps = dispatch => bindActionCreators(filterActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(VelocityTrimListFilter)
