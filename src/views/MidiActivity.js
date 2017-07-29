import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from '../styles/midiActivity';

const MidiActivity = (props) => {
  const { stompblock } = props;
  const { midiInActivity, midiOutActivity } = stompblock;

  return (
    <div className={styles.midiActivity}>
      <div>MIDI IN</div>
      <div className={midiInActivity ? styles.ledRedBlink : styles.ledRed} />
      <div>OUT</div>
      <div className={midiOutActivity ? styles.ledYellowBlink : styles.ledYellow} />
    </div>
  );
};

MidiActivity.propTypes = {
  stompblock: PropTypes.object.isRequired,
};

const mapStateToProps = ({ stompblock }) => ({ stompblock });

export default connect(
  mapStateToProps,
)(MidiActivity);
