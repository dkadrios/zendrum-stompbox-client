import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from '../styles/infoPanel';

const InfoPanel = (props) => {
  const { version } = props;

  const formatted = value => `v${value}.0`;

  const foundVersion = () => (
    version.anvil === version.expectedAnvil
      ? formatted(version.anvil)
      : <span className={styles.wrongVersion}>{formatted(version.anvil)}</span>
  );

  return (
    <div className={styles.infoPanel}>
      <h1>STOMPBLOCK Client Interface</h1>
      <table cellPadding="0" cellSpacing="0">
        <tbody>
          <tr>
            <th>Version</th>
            <td>: {formatted(version.client)}</td>
          </tr>
          <tr>
            <th>Expected <a href="https://zendrumstudio.com/anvil">ANVIL</a></th>
            <td>: {formatted(version.expectedAnvil)}</td>
          </tr>
          <tr>
            <th>Found <a href="https://zendrumstudio.com/anvil">ANVIL</a></th>
            <td>: {foundVersion()}</td>
          </tr>
        </tbody>
      </table>
      <div className={styles.copyright}>
        &copy; Copyright <a href="https://nebiru.com">Nebiru Software</a>, 2017
      </div>
    </div>
  );
};

InfoPanel.propTypes = {
  version: PropTypes.object.isRequired,
};

const mapStateToProps = ({ version }) => ({ version });

export default connect(
  mapStateToProps,
)(InfoPanel);
