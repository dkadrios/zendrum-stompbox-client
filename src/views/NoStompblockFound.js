import React from 'react';
import styles from '../styles/midiSecurity';

const NoStompblockFound = () => (
  <div className={styles.noStompblockFound}>
    <h1>STOMPBLOCK Not Found</h1>
    <p>
      Sorry, I could not find an available STOMPBLOCK attached to your computer.
    </p>
    <h2>Troubleshooting</h2>
    <ul>
      <li>Check that your STOMPBLOCK is connected via USB</li>
      <li>Check that no other software is utilizing your STOMPBLOCK</li>
      <li>If connecting through a USB Host device, try connecting directly instead</li>
      <li>Refresh this page</li>
    </ul>
  </div>
);

export default NoStompblockFound;
