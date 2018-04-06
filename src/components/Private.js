import React from 'react'
import { Route, Redirect, withRouter, Link } from 'react-router-dom'
import Logout from './Logout'

const PrivateRoute = ({component: Component, ...rest}) => {
  const loggedIn = localStorage.getItem('loggedIn')
  return (
    <div>
      {loggedIn === 'true' ? <Route {...rest} render={props => (
        <div className='content'>
          <nav>
            <Link to='/admin/feedback'>Feedback</Link>
            <Link to='/admin/teachers'>Teachers</Link>
            <Link to='/admin/sending_letters'>Sending Letters</Link>
            <Logout />
          </nav>
          <Component {...props} />
        </div>
      )}
      /> : <Redirect to="/admin/login" />
      }
    </div>
  )
}

export default withRouter(PrivateRoute)