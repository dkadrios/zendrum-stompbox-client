import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DebounceInput from 'react-debounce-input';
import Dropdown from 'react-toolbox/lib/dropdown';
import FontIcon from 'react-toolbox/lib/font_icon';
import * as filterActions from '../action-creators/velocityTrimListFilter';
import styles from '../styles/velocityTrimListFilter';

const VelocityTrimListFilter = (props) => {
  const { velocityTrim, searchTrims, changeGroup, changeListView } = props;

  const { search, group, listView } = velocityTrim;

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

      <div className={styles.buttonGroup}>
        <button
          title="View narrow"
          className={(listView === 'narrow') ? styles.selected : ''}
          onClick={() => changeListView('narrow')}
        >
          <FontIcon>view_stream</FontIcon>
        </button>
        <button
          title="View medium"
          className={(listView === 'medium') ? styles.selected : ''}
          onClick={() => changeListView('medium')}
        >
          <FontIcon>view_module</FontIcon>
        </button>
        <button
          title="View wide"
          className={(listView === 'wide') ? styles.selected : ''}
          onClick={() => changeListView('wide')}
        >
          <FontIcon>view_comfy</FontIcon>
        </button>
      </div>
    </div>
  );
};

VelocityTrimListFilter.propTypes = {
  velocityTrim: PropTypes.object.isRequired,
  searchTrims: PropTypes.func.isRequired,
  changeGroup: PropTypes.func.isRequired,
  changeListView: PropTypes.func.isRequired,
};

const mapStateToProps = ({ velocityTrim }) => ({ velocityTrim });
const mapDispatchToProps = dispatch => bindActionCreators(filterActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VelocityTrimListFilter);
