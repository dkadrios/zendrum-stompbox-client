import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { userShape } from '../reducers/user'
import AdImage from '../images/try-restomp.png'

const RestompAd = ({ user }) => {
  const { ownsRestomp, checkedRegistration } = user

  return !checkedRegistration || ownsRestomp ? null : (
    <div style={{ marginRight: 60 }}>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://zendrumstudio.com/restomp"
      >
        <img
          src={AdImage}
          alt="Try Restomp today!"
          width="260"
          height="44"
        />
      </a>
    </div>
  )
}

RestompAd.propTypes = {
  user: PropTypes.shape(userShape).isRequired,
}

const mapStateToProps = ({ user }) => ({ user })

export default connect(mapStateToProps)(RestompAd)
