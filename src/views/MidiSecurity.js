import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dialog from 'react-toolbox/lib/dialog';
import FontIcon from 'react-toolbox/lib/font_icon';
import styles from '../styles/midiSecurity';

const MidiSecurity = (props) => {
  const { stompblock } = props;

  return (
    <Dialog
      active={!stompblock.accessGranted}
      title="Your Permission Is Required"
      className={styles.midiSecurity}
    >
      <div>
        <FontIcon>security</FontIcon>
        <p>
          This application requires special permissions before it can use
          SysEx and connect to your Zendrum STOMPBLOCK.
        </p>
      </div>
      <p>
        Please select &apos;Allow&apos; when prompted by your browser.
      </p>
    </Dialog>
  );
};

MidiSecurity.propTypes = {
  stompblock: PropTypes.object.isRequired,
};

const mapStateToProps = ({ stompblock }) => ({ stompblock });

export default connect(mapStateToProps)(MidiSecurity);
