import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DebounceInput from 'react-debounce-input';
import * as filterActions from '../action-creators/velocityTrimListFilter';
import styles from '../styles/velocityTrimListFilter';

const VelocityTrimListFilter = (props) => {
  const { velocityTrim, searchTrims } = props;

  return (
    <div className={styles.filters}>
      <DebounceInput
        type="search"
        placeholder="Search"
        debounceTimeout={200}
        onChange={event => searchTrims(event.target.value)}
      />
    </div>
  );
};

VelocityTrimListFilter.propTypes = {
  velocityTrim: PropTypes.object.isRequired,
  searchTrims: PropTypes.func.isRequired,
};

const mapStateToProps = ({ velocityTrim }) => ({ velocityTrim });
const mapDispatchToProps = dispatch => bindActionCreators(filterActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VelocityTrimListFilter);
