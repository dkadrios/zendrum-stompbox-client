import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DebounceInput from 'react-debounce-input';
import Dropdown from 'react-toolbox/lib/dropdown';
import * as filterActions from '../action-creators/velocityTrimListFilter';
import styles from '../styles/velocityTrimListFilter';

const VelocityTrimListFilter = (props) => {
  const { velocityTrim, searchTrims, changeGroup } = props;

  const { search, group } = velocityTrim;

  const groups = [
    { value: 'all', label: 'All groups' },
    { value: 'Cymbals', label: 'Cymbals' },
    { value: 'Hats', label: 'Hats' },
    { value: 'Kicks', label: 'Kicks' },
    { value: 'Perc', label: 'Perc' },
    { value: 'Rides', label: 'Rides' },
    { value: 'Snares', label: 'Snares' },
    { value: 'Toms', label: 'Toms' },
  ];

  return (
    <div className={styles.filters}>
      <DebounceInput
        type="search"
        value={search}
        placeholder="Filter by name"
        debounceTimeout={200}
        onChange={event => searchTrims(event.target.value)}
      />

      <Dropdown
        className={styles.groups}
        auto
        onChange={value => changeGroup(value)}
        source={groups}
        value={group}
      />
    </div>
  );
};

VelocityTrimListFilter.propTypes = {
  velocityTrim: PropTypes.object.isRequired,
  searchTrims: PropTypes.func.isRequired,
  changeGroup: PropTypes.func.isRequired,
};

const mapStateToProps = ({ velocityTrim }) => ({ velocityTrim });
const mapDispatchToProps = dispatch => bindActionCreators(filterActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VelocityTrimListFilter);
