import React from 'react';
import styles from '../styles/midiSecurity';

const MidiSecurity = () => (
  <div className={styles.midiSecurity}>
    <h1>Connect Instructions</h1>
    <p>
      This application requires special permissions before it can use
      SysEx and connect to your Zendrum STOMPBOX.
    </p>
    <p>
      Please select &#8216;Allow&#8217; when prompted.
    </p>
  </div>
);

export default MidiSecurity;
