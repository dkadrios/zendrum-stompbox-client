import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PolyLockInstructions from '../instructions/PolyLockInstructions'
import styles from '../../styles/muteGroups'
import { MAX_POLYLOCKS } from '../../midi/'
import * as polyLockActions from '../../action-creators/polyLocks'
import { polyLocksShape } from '../../reducers/polyLocks'

const PolyLocks = (props) => {
  const { polyLocks: { data }, mapping: { entries }, deletePolyLock, addPolyLock } = props

  return (
    <div className={styles.muteGroupsContainer}>
      <PolyLockInstructions />
      <div className={styles.muteGroups}>
        {data.map((group, idx) => (
          <div key={idx}>
            {/* <MuteGroup
              mapping={entries}
              group={group}
              ordinal={idx}
              deleteMuteItem={deleteMuteItem}
              addMuteItem={addMuteItem}
              deleteMuteGroup={deleteMuteGroup}
            /> */}
          </div>
        ))}
        {/*        <Button icon="add" label="Create New Lock" raised primary onClick={addPolyLock} /> */}
        <small>
          Using {data.length} of {MAX_POLYLOCKS}
          &nbsp;available locks
        </small>
      </div>
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
