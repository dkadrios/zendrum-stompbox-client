import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import VelocityTrim from './VelocityTrim';
import VelocityTrimListFilter from './VelocityTrimListFilter';
import * as webMidiActions from '../action-creators/webMidi';
import styles from '../styles/velocityTrim';

const VelocityTrimList = (props) => {
  const { velocityTrim } = props;
  const { data, search, group, listView } = velocityTrim;

  const searchRE = RegExp(search, 'i');

  const filteredTrims = data.filter(item =>
    (group === 'all' || group === item.group)
    && (searchRE.test(item.name) || searchRE.test(item.note)),
  );

  return (
    <div className={styles.listContainer}>
      <VelocityTrimListFilter />
      <ul className={styles[`${listView}View`]}>
        {
          filteredTrims.map(item => (
            <VelocityTrim
              key={item.note}
              item={item}
              styles={styles}
              {...props}
            />
          ))
        }
      </ul>
    </div>
  );
};

VelocityTrimList.propTypes = {
  velocityTrim: PropTypes.object.isRequired,
};

const mapStateToProps = ({ velocityTrim }) => ({ velocityTrim });
const mapDispatchToProps = dispatch => bindActionCreators(webMidiActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VelocityTrimList);
