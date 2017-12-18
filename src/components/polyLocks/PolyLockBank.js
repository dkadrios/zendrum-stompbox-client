import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Visible from 'react-visible'
import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import PolyLockNewItem from './PolyLockNewItem'
// import Button from 'material-ui/Button'
// import BankPicker from '../pickers/BankPicker'
import PolyLockItem from './PolyLockItem'
import { mappingShape } from '../../reducers/mapping'
import { polyLockShape } from '../../reducers/polyLocks'
import paperStyle from '../../styles/paper'
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
  } = props

  return (
    <div>
      <Paper style={paperStyle}>
        <Visible isVisible={hasSoundBankSupport && __BANK_FEATURE__}>
          <Toolbar>
            <Typography color="inherit" type="title" className={classes.title}>
              Bank {String.fromCharCode(65 + bank)}
            </Typography>
          </Toolbar>
        </Visible>
        <Divider />
        <section>
          {polyLocks
            .filter(lock => lock.bank === bank)
            .map(({ pitch }, idx) => (
              <PolyLockItem
                key={idx}
                bank={bank}
                pitch={pitch}
                mapping={mapping}
                deletePolyLock={deletePolyLock}
              />
            ))}
        </section>

        <PolyLockNewItem
          bank={bank}
          addPolyLock={addPolyLock}
          mapping={mapping}
          disabled={polyLocks.length >= MAX_POLYLOCKS}
        />
      </Paper>
    </div>
  )
}

PolyLockBank.propTypes = {
  polyLocks: PropTypes.arrayOf(PropTypes.shape(polyLockShape)).isRequired,
  bank: PropTypes.number.isRequired,
  addPolyLock: PropTypes.func.isRequired,
  deletePolyLock: PropTypes.func.isRequired,
  mapping: PropTypes.arrayOf(PropTypes.shape(mappingShape)).isRequired,
  classes: PropTypes.object.isRequired,
  hasSoundBankSupport: PropTypes.bool.isRequired,
}

export default withStyles(muiStyles)(PolyLockBank)
