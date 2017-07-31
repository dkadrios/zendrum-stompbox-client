import React from 'react';
import PropTypes from 'prop-types';

import VelocityTrim from './VelocityTrim';
import styles from '../styles/velocityTrim';

const VelocityTrimList = (props) => {
  const { listView, items, selectedNoteNum } = props;

  return (
    <ul className={styles[`${listView}View`]}>
      {
        items.map(item => (
          <VelocityTrim
            key={item.note}
            item={item}
            styles={styles}
            selected={item.note === selectedNoteNum}
            {...props}
          />
        ))
      }
    </ul>
  );
};

VelocityTrimList.propTypes = {
  items: PropTypes.array.isRequired,
  listView: PropTypes.string.isRequired,
  selectedNoteNum: PropTypes.number.isRequired,
};

export default VelocityTrimList;
