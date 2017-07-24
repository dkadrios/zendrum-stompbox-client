import React from 'react';
import Dialog from 'react-toolbox/lib/dialog';
import FontIcon from 'react-toolbox/lib/font_icon';
import styles from '../styles/midiSecurity';

const NoStompblockFound = () => (
  <Dialog
    active
    title="STOMPBLOCK Not Found"
    className={styles.noStompblockFound}
  >
    <div>
      <FontIcon>error_outline</FontIcon>
      <p>
        Sorry, I could not find an available STOMPBLOCK attached to your device
      </p>
    </div>
    <h2>Troubleshooting</h2>
    <ul>
      <li>Check that your STOMPBLOCK is connected via USB</li>
      <li>Check that no other software is utilizing your STOMPBLOCK</li>
      <li>If connecting through a USB Host device, try connecting directly instead</li>
      <li>Refresh this page</li>
    </ul>
  </Dialog>
);

export default NoStompblockFound;
