import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Visible from 'react-visible'
import Paper from 'material-ui/Paper'
import PolyLockInstructions from '../instructions/PolyLockInstructions'
import PolyLockBank from '../polyLocks/PolyLockBank'
import styles from '../../styles/polyLocks'
import paperStyle from '../../styles/paper'
import { MAX_POLYLOCKS } from '../../midi/'
import * as polyLockActions from '../../action-creators/polyLocks'
import * as settingsActions from '../../action-creators/settings'
import { polyLocksShape } from '../../reducers/polyLocks'
import { settingsShape } from '../../reducers/settings'

const PolyLocks = (props) => {
  const {
    polyLocks: { data, hasSoundBankSupport },
    mapping: { entries },
    settings: { polyLocksEnabled },
    deletePolyLock,
    addPolyLock,
    setPolyLocksEnabled,
  } = props

  return (
    <div className={styles.polyLocksCont}>
      <PolyLockInstructions enabled={polyLocksEnabled} onChange={setPolyLocksEnabled} />
      <Paper style={paperStyle}>
        <section>
          <PolyLockBank
            polyLocks={data}
            mapping={entries}
            bank={0}
            disabled={!polyLocksEnabled}
            deletePolyLock={deletePolyLock}
            addPolyLock={addPolyLock}
            hasSoundBankSupport={hasSoundBankSupport}
          />
          <Visible isVisible={hasSoundBankSupport && __BANK_FEATURE__}>
            <PolyLockBank
              polyLocks={data}
              mapping={entries}
              bank={1}
              disabled={!polyLocksEnabled}
              deletePolyLock={deletePolyLock}
              addPolyLock={addPolyLock}
              hasSoundBankSupport={hasSoundBankSupport}
            />
          </Visible>
        </section>
      </Paper>

      <small>
        Using {data.length} of {MAX_POLYLOCKS}
        &nbsp;available locks
      </small>
    </div>
  )
}

PolyLocks.propTypes = {
  polyLocks: PropTypes.shape(polyLocksShape).isRequired,
  mapping: PropTypes.shape({ entries: PropTypes.array.isRequired }).isRequired,
  settings: PropTypes.shape(settingsShape).isRequired,
  addPolyLock: PropTypes.func.isRequired,
  deletePolyLock: PropTypes.func.isRequired,
  setPolyLocksEnabled: PropTypes.func.isRequired,
}

const mapStateToProps = ({ polyLocks, mapping, settings }) => ({ polyLocks, mapping, settings })
const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...polyLockActions, ...settingsActions }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PolyLocks)
