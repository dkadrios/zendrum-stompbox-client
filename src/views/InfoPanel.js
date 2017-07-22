import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from '../styles/infoPanel';

const InfoPanel = (props) => {
  const { version } = props;

  const formatted = value => `v${(value / 10).toFixed(1)}`;

  const foundVersion = () => (
    version.anvil === version.expectedAnvil
      ? formatted(version.anvil)
      : <span className={styles.wrongVersion}>{formatted(version.anvil)}</span>
  );

  return (
    <footer className={styles.infoPanel}>
      <div className={styles.copyright}>
        &copy; Copyright <a href="https://nebiru.com">Nebiru Software</a>, 2017
      </div>
      <div className={styles.versions}>
        <span className={styles.version}>Version : {formatted(version.client)}</span>
        <span className={styles.version}><a href="https://zendrumstudio.com/anvil">ANVIL</a> : {foundVersion()}</span>
      </div>
    </footer>
  );
};

InfoPanel.propTypes = {
  version: PropTypes.object.isRequired,
};

const mapStateToProps = ({ version }) => ({ version });

export default connect(
  mapStateToProps,
)(InfoPanel);
