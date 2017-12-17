import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import Toolbar from 'material-ui/Toolbar'
import Tooltip from 'material-ui/Tooltip'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import DeleteIcon from 'material-ui-icons/Delete'
import MuteItem from './MuteItem'
import MuteGroupNewItem from './MuteGroupNewItem'
import { mappingShape } from '../../reducers/mapping'
import { muteGroupShape } from '../../reducers/muteGroups'
import styles from '../../styles/muteGroups'
import paperStyle from '../../styles/paper'

const muiStyles = {
  title: {
    flex: 1,
  },
}

const MuteGroup = (props) => {
  const { group, ordinal, deleteMuteItem, deleteMuteGroup, mapping, classes } = props
  const { muteables, muters } = group

  const List = (list, muter) =>
    list.map((note, idx) => (
      <MuteItem
        key={idx}
        note={note}
        mapping={mapping}
        groupIdx={ordinal}
        itemIdx={idx}
        muter={muter}
        deleteMuteItem={deleteMuteItem}
      />
    ))

  return (
    <div>
      <Paper style={paperStyle}>
        <Toolbar>
          <Typography color="inherit" type="title" className={classes.title}>
            Group #{ordinal + 1}
          </Typography>
          <Tooltip title="Delete group" placement="bottom">
            <Button fab mini aria-label="delete" onClick={() => deleteMuteGroup(ordinal)}>
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

          <MuteGroupNewItem {...props} muter={false} />
          <MuteGroupNewItem {...props} muter />
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
  mapping: PropTypes.arrayOf(PropTypes.shape(mappingShape)).isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(muiStyles)(MuteGroup)
