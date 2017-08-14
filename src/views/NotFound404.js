/* @flow */
import React from 'react'

type Props = { location: { pathname: string } }

const NotFound404 = ({ location }: Props) =>
  (<div className="not-found-404">
    <h1>
      Cannot find resource at {location.pathname}
    </h1>
  </div>)

export default NotFound404
