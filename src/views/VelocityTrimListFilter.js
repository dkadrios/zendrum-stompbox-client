import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DebounceInput from 'react-debounce-input';
import Dropdown from 'react-toolbox/lib/dropdown';
import Tooltip from 'react-toolbox/lib/tooltip';
import Button from 'react-toolbox/lib/button';
import * as filterActions from '../action-creators/velocityTrimListFilter';
import styles from '../styles/velocityTrimListFilter';
import buttonTheme from '../styles/react-toolbox-theme/ToolButton.scss';

const ToolTipButton = Tooltip(props => <Button {...props} />);

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
        <ToolTipButton
          theme={buttonTheme}
          icon="view_stream"
          primary={listView === 'narrow'}
          raised
          tooltip="Narrow view"
          className={(listView === 'narrow') ? styles.selected : ''}
          onClick={() => changeListView('narrow')}
        />
        <ToolTipButton
          theme={buttonTheme}
          icon="view_module"
          primary={listView === 'medium'}
          raised
          tooltip="Medium view"
          className={(listView === 'medium') ? styles.selected : ''}
          onClick={() => changeListView('medium')}
        />
        <ToolTipButton
          theme={buttonTheme}
          icon="view_comfy"
          primary={listView === 'wide'}
          raised
          tooltip="Wide view"
          className={(listView === 'wide') ? styles.selected : ''}
          onClick={() => changeListView('wide')}
        />
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
