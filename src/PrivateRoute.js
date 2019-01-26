// redirect to login page if not authenticated
import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {

  // assume that token == authentication, which should be true if we delete it if there's an error in Environment.js
  const isLoggedIn = (): boolean => {
    if(localStorage.getItem('AUTH_TOKEN') != null) return true
    else return false
  }

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  )
}

export default PrivateRoute