import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Visible from 'react-visible'
import PolyLockInstructions from '../instructions/PolyLockInstructions'
import PolyLockBank from '../polyLocks/PolyLockBank'
import styles from '../../styles/muteGroups'
import { MAX_POLYLOCKS } from '../../midi/'
import * as polyLockActions from '../../action-creators/polyLocks'
import { polyLocksShape } from '../../reducers/polyLocks'

const PolyLocks = (props) => {
  const {
    polyLocks: { data, hasSoundBankSupport },
    mapping: { entries },
    deletePolyLock,
    addPolyLock,
  } = props

  return (
    <div className={styles.muteGroupsContainer}>
      <PolyLockInstructions />
      <div>
        <PolyLockBank
          polyLocks={data}
          mapping={entries}
          bank={0}
          deletePolyLock={deletePolyLock}
          addPolyLock={addPolyLock}
          hasSoundBankSupport={hasSoundBankSupport}
        />
      </div>
      <Visible isVisible={hasSoundBankSupport && __BANK_FEATURE__}>
        <PolyLockBank
          polyLocks={data}
          mapping={entries}
          bank={1}
          deletePolyLock={deletePolyLock}
          addPolyLock={addPolyLock}
          hasSoundBankSupport={hasSoundBankSupport}
        />
      </Visible>
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
  addPolyLock: PropTypes.func.isRequired,
  deletePolyLock: PropTypes.func.isRequired,
}

const mapStateToProps = ({ polyLocks, mapping }) => ({ polyLocks, mapping })
const mapDispatchToProps = dispatch => bindActionCreators(polyLockActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PolyLocks)
