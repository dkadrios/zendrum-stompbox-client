import React, { PropTypes } from 'react';

const NotFound404 = ({ location }) =>
  (<div className="not-found-404">
    <h1>Cannot find resource at {location.pathname}</h1>
  </div>);

export default NotFound404;

NotFound404.propTypes = {
  location: PropTypes.string.isRequired,
};
