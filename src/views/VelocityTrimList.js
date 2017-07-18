import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as webMidiActions from '../action-creators/webMidi';
import styles from '../styles/velocityTrim';

const VelocityTrimList = (props) => {
  const { velocityTrim } = props;

  return (
    <div className={styles.listContainer}>
      <h1>Trims</h1>
      <ul className={styles.list}>
        {
          velocityTrim.data.map(item => (
            <li key={item.note} className={styles.listItem}>
              <div className={styles.header}>
                <div className={styles.noteNum}>{item.note}</div>
                <div className={styles.noteGroup}>{item.group}</div>
              </div>
              <div className={styles.noteName} title={item.name}>{item.name}</div>
              <div className={styles.trimContainer}>{item.trim}</div>
            </li>
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
