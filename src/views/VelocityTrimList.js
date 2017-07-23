import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import VelocityTrim from './VelocityTrim';
import * as webMidiActions from '../action-creators/webMidi';
import styles from '../styles/velocityTrim';

const VelocityTrimList = (props) => {
  const { velocityTrim } = props;

  return (
    <div className={styles.listContainer}>
      <div>[SORT CONTROLS]</div>
      <ul className={styles.list}>
        {
          velocityTrim.data.map(item => (
            <VelocityTrim
              key={item.note}
              item={item}
              styles={styles}
              {...props}
            />
          ))
        }
      </ul>
    </div>
  );
};

VelocityTrimList.propTypes = {
  velocityTrim: PropTypes.object.isRequired,
};

const mapStateToProps = ({ velocityTrim }) => ({ velocityTrim });
const mapDispatchToProps = dispatch => bindActionCreators(webMidiActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VelocityTrimList);
