import React from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import DeleteIcon from 'material-ui-icons/Delete'
import MuteItem from './MuteItem'
import MuteGroupNewItem from './MuteGroupNewItem'
import { mappingShape } from '../../reducers/mapping'
import { muteGroupShape } from '../../reducers/muteGroups'
import styles from '../../styles/muteGroups'
import paperStyle from '../../styles/paper'

const MuteGroup = (props) => {
  const { group, ordinal, deleteMuteItem, deleteMuteGroup, mapping } = props
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
          <Typography type="title">Group #{ordinal + 1}</Typography>
          <Button fab mini aria-label="delete" onClick={() => deleteMuteGroup(ordinal)}>
            <DeleteIcon />
          </Button>
        </Toolbar>
        <div className={styles.muteGroup}>
          <section>
            <h1>These notes are muted&hellip;</h1>
            {List(muteables, false)}
          </section>

          <section>
            <h1>&hellip;whenever these notes are played</h1>
            {List(muters, true)}
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
}

export default MuteGroup
