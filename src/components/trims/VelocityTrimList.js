import React, { Component } from 'react'
import PropTypes from 'prop-types'
import VelocityTrim from './VelocityTrim'
import styles from '../../styles/velocityTrim'
import { trimShape } from '../../reducers/velocityTrim'

class VelocityTrimList extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(trimShape).isRequired,
    velocityTrim: PropTypes.shape({
      listView: PropTypes.string.isRequired,
      selectedNoteNum: PropTypes.number.isRequired,
    }).isRequired,
  }

  componentDidUpdate() {
    if (this.trimItem) {
      this.trimItem.scrollIntoView({ block: 'nearest', behavior: 'auto', inline: 'center' })
    }
  }

  render() {
    const { items, velocityTrim, ...rest } = this.props
    const { listView, selectedNoteNum, bank } = velocityTrim

    return (
      <div className={styles.list}>
        <ul className={styles[`${listView}View`]}>
          {items.map((item, idx) => (
            <li
              key={`trim_list_${idx}`}
              ref={(trimItem) => {
                if (!Number.isNaN(selectedNoteNum) && selectedNoteNum === item.note) {
                  this.trimItem = trimItem
                }
              }}
            >
              <VelocityTrim
                item={item}
                bank={bank}
                listView={listView}
                selected={item.note === selectedNoteNum}
                {...rest}
              />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default VelocityTrimList
