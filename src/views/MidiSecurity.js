import React from 'react';
import Dialog from 'react-toolbox/lib/dialog';
import FontIcon from 'react-toolbox/lib/font_icon';
import styles from '../styles/midiSecurity';

const MidiSecurity = () => (
  <Dialog
    active
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

export default MidiSecurity;
