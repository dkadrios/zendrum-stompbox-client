import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Divider from 'material-ui/Divider'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import PolyLockNewItem from './PolyLockNewItem'
import PolyLockItem from './PolyLockItem'
import { mappingsShape } from '../../reducers/mapping'
import { polyLockShape } from '../../reducers/polyLocks'
import styles from '../../styles/polyLocks'
import { MAX_POLYLOCKS } from '../../midi/index'

const muiStyles = {
  title: {
    flex: 1,
  },
  bank: {
    paddingRight: 70,
  },
}

const PolyLockBank = (props) => {
  const {
    polyLocks,
    bank,
    addPolyLock,
    deletePolyLock,
    mapping,
    classes,
    hasSoundBankSupport,
    disabled,
  } = props

  return (
    <div className={styles.bank}>
      {hasSoundBankSupport && (
        <Toolbar>
          <Typography color="inherit" type="title" className={classes.title}>
            Bank {String.fromCharCode(65 + bank)}
          </Typography>
        </Toolbar>
      )}
      <Divider />
      <section>
        {polyLocks
          .filter(lock => lock.bank === bank)
          .map(({ pitch, idx }) => (
            <PolyLockItem
              key={`lockItem_${bank}_${idx}`}
              idx={idx}
              pitch={pitch}
              mapping={mapping}
              bank={bank}
              deletePolyLock={deletePolyLock}
              disabled={disabled}
            />
          ))}
      </section>

      <PolyLockNewItem
        bank={bank}
        addPolyLock={addPolyLock}
        mapping={mapping}
        disabled={disabled || polyLocks.length >= MAX_POLYLOCKS}
      />
    </div>
  )
}

PolyLockBank.propTypes = {
  polyLocks: PropTypes.arrayOf(PropTypes.shape(polyLockShape)).isRequired,
  bank: PropTypes.number.isRequired,
  addPolyLock: PropTypes.func.isRequired,
  deletePolyLock: PropTypes.func.isRequired,
  mapping: PropTypes.shape(mappingsShape).isRequired,
  classes: PropTypes.object.isRequired,
  hasSoundBankSupport: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
}

export default withStyles(muiStyles)(PolyLockBank)
