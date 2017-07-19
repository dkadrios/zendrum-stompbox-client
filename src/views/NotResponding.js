import React from 'react';
import styles from '../styles/midiSecurity';

const NotResponding = () => (
  <div className={styles.noStompblockFound}>
    <h1>STOMPBLOCK Not Responding</h1>
    <p>
      There appears to be an available STOMPBLOCK attached to your computer,
      however it is not responding to requests.
    </p>
    <h2>Troubleshooting</h2>
    <ul>
      <li>Check that your STOMPBLOCK is connected via USB</li>
      <li>Check that no other software is utilizing your STOMPBLOCK</li>
      <li>Plug directly into a USB port, if using a HUB or other USB host device</li>
      <li>Try a different USB port</li>
      <li>Power down the STOMPBLOCK, plug it back in, wait 5 seconds and then refresh this page</li>
    </ul>
  </div>
);

export default NotResponding;
