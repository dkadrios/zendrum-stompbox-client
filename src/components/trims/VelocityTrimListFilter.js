import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import DebounceInput from 'react-debounce-input'
import { Select, Switch, MenuItem, FormControlLabel, FormControl } from '@material-ui/core'
import availableGroups from '../../mappings'
import Btn from '../HOC/ToolbarButton'
import Tooltipped from '../HOC/Tooltipped'
import BankButton from '../BankButton'
import * as filterActions from '../../action-creators/velocityTrimListFilter'
import { velocityTrimShape } from '../../reducers/velocityTrim'
import styles from '../../styles/velocityTrimListFilter'

const VelocityTrimListFilter = (props) => {
  const { velocityTrim, searchTrims, changeGroup, changeListView, setChaseEnabled, selectBank } = props
  const { search, group, listView, chaseEnabled, bank, hasSoundBankSupport } = velocityTrim

  return (
    <div className={styles.filters}>
      {hasSoundBankSupport && (
        <div className={styles.buttonGroup}>
          <BankButton
            selectedBank={bank}
            bank={0}
            onClick={selectBank}
          />
          <BankButton
            selectedBank={bank}
            bank={1}
            onClick={selectBank}
          />
        </div>
      )}

      <div className={styles.buttonGroup}>
        <Btn
          icon="list"
          view="list"
          selected={listView === 'list'}
          onClick={() => changeListView('list')}
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

      <Select
        onChange={({ target }) => changeGroup(target.value)}
        value={group}
      >
        {availableGroups.map(({ value, label }) => (
          <MenuItem
            key={value}
            value={value}
          >
            {label}
          </MenuItem>
        ))}
      </Select>

      <DebounceInput
        type="search"
        value={search}
        placeholder="Filter by name or #"
        debounceTimeout={200}
        onChange={e => searchTrims(e.target.value)}
      />

      <div className={styles.midiChase}>
        <Tooltipped tooltip="Highlight any notes played on Zendrum or other instrument (requires THRU be enabled)">
          <FormControl>
            <FormControlLabel
              control={
                <Switch
                  color="primary"
                  checked={chaseEnabled}
                  onChange={(event, checked) => setChaseEnabled(checked)}
                />
              }
              label="MIDI Chase"
            />
          </FormControl>
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
  selectBank: PropTypes.func.isRequired,
}

const mapStateToProps = ({ velocityTrim }) => ({ velocityTrim })
const mapDispatchToProps = dispatch => bindActionCreators(filterActions, dispatch)

// eslint-disable-next-line
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VelocityTrimListFilter)
