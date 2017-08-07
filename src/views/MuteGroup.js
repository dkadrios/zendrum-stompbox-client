import React from 'react';
import PropTypes from 'prop-types';
import { AppBar } from 'react-toolbox';
import MuteItem from './MuteItem';
import MuteItemNew from './MuteItemNew';
import styles from '../styles/muteGroups';
import SubAppBarTheme from '../styles/react-toolbox-theme/SubAppBar.scss';
import { MAX_MUTEABLES_PER_GROUP, MAX_MUTERS_PER_GROUP } from '../midi';

const MuteGroup = (props) => {
  const {
    group,
    ordinal,
    deleteMuteItem,
    deleteMuteGroup,
    addMuteItem,
  } = props;

  const { muteables, muters } = group;

  return (
    <div>
      <AppBar
        theme={SubAppBarTheme}
        title={`Group #${ordinal + 1}`}
        rightIcon="delete_forever"
        onRightIconClick={() => deleteMuteGroup(ordinal)}
      />
      <div className={styles.muteGroup}>
        <section>
          <h1>These notes are muted&hellip;</h1>
          {muteables.map((item, idx) => (
            <MuteItem
              key={idx}
              item={item}
              groupIdx={ordinal}
              itemIdx={idx}
              muter={false}
              deleteMuteItem={deleteMuteItem}
            />
          ))}
        </section>

        <section>
          <h1>&hellip;whenever these notes are played</h1>
          {muters.map((item, idx) => (
            <MuteItem
              key={idx}
              item={item}
              groupIdx={ordinal}
              itemIdx={idx}
              muter
              deleteMuteItem={deleteMuteItem}
            />
          ))}
        </section>

        <div>
          <MuteItemNew
            groupIdx={ordinal}
            muter={false}
            addMuteItem={addMuteItem}
          />
          <small>{MAX_MUTEABLES_PER_GROUP} MAX
            ({MAX_MUTEABLES_PER_GROUP - muteables.length} available)</small>
        </div>
        <div>
          <MuteItemNew
            groupIdx={ordinal}
            muter
            addMuteItem={addMuteItem}
          />
          <small>{MAX_MUTERS_PER_GROUP} MAX
            ({MAX_MUTERS_PER_GROUP - muters.length} available)</small>
        </div>
      </div>
    </div>
  );
};

MuteGroup.propTypes = {
  group: PropTypes.object.isRequired,
  ordinal: PropTypes.number.isRequired,
  deleteMuteItem: PropTypes.func.isRequired,
  deleteMuteGroup: PropTypes.func.isRequired,
  addMuteItem: PropTypes.func.isRequired,
};

export default MuteGroup;
