import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Visible from 'react-visible'
import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import Toolbar from 'material-ui/Toolbar'
import Tooltip from 'material-ui/Tooltip'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import DeleteIcon from 'material-ui-icons/Delete'
import BankPicker from '../pickers/BankPicker'
import MuteItem from './MuteItem'
import MuteGroupNewItem from './MuteGroupNewItem'
import { mappingsShape } from '../../reducers/mapping'
import { muteGroupShape } from '../../reducers/muteGroups'
import styles from '../../styles/muteGroups'
import paperStyle from '../../styles/paper'

const muiStyles = {
  title: {
    flex: 1,
  },
  bank: {
    paddingRight: 70,
  },
}

const MuteGroup = (props) => {
  const {
    group,
    ordinal,
    deleteMuteItem,
    deleteMuteGroup,
    changeBank,
    mapping,
    hasSoundBankSupport,
    classes,
    disabled,
  } = props
  const { muteables, muters, bank } = group

  const List = (list, muter) =>
    list.map((note, idx) => (
      <MuteItem
        key={idx}
        note={note}
        mapping={mapping}
        bank={bank}
        groupIdx={ordinal}
        itemIdx={idx}
        muter={muter}
        deleteMuteItem={deleteMuteItem}
        disabled={disabled}
      />
    ))

  return (
    <div>
      <Paper style={paperStyle}>
        <Toolbar>
          <Typography color="inherit" type="title" className={classes.title}>
            Mute Group
          </Typography>
          <Visible isVisible={hasSoundBankSupport && __BANK_FEATURE__}>
            <div className={classes.bank}>
              <BankPicker
                disabled={disabled}
                value={bank}
                onChange={val => changeBank(ordinal, val)}
              />
            </div>
          </Visible>
          <Tooltip title="Delete group" placement="bottom">
            <Button
              disabled={disabled}
              fab
              mini
              aria-label="delete"
              onClick={() => deleteMuteGroup(ordinal)}
            >
              <DeleteIcon />
            </Button>
          </Tooltip>
        </Toolbar>
        <Divider />
        <div className={styles.muteGroup}>
          <section>
            <h1>These notes are muted&hellip;</h1>
            <div className={styles.list}>{List(muteables, false)}</div>
          </section>
          <section>
            <h1>&hellip;whenever these notes are played</h1>
            <div className={styles.list}>{List(muters, true)}</div>
          </section>
          <MuteGroupNewItem bank={bank} {...props} disabled={disabled} muter={false} />
          <MuteGroupNewItem bank={bank} {...props} disabled={disabled} muter />
        </div>
      </Paper>
    </div>
  )
}

MuteGroup.propTypes = {
  group: PropTypes.shape(muteGroupShape).isRequired,
  ordinal: PropTypes.number.isRequired,
  addMuteItem: PropTypes.func.isRequired,
  deleteMuteItem: PropTypes.func.isRequired,
  deleteMuteGroup: PropTypes.func.isRequired,
  changeBank: PropTypes.func.isRequired,
  mapping: PropTypes.shape(mappingsShape).isRequired,
  hasSoundBankSupport: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
}

export default withStyles(muiStyles)(MuteGroup)
