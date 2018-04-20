import React from 'react'
import { Route, Redirect, withRouter, NavLink} from 'react-router-dom'
import Logout from './Logout'

const PrivateRoute = ({component: Component, ...rest}) => {
  const loggedIn = localStorage.getItem('loggedIn')
  return (
    <div>
      {loggedIn === 'true' ? <Route {...rest} render={props => (
        <div className='content'>
          <nav>
            <NavLink to='/admin/feedback'>Feedback</NavLink>
            <NavLink to='/admin/teachers'>Teachers</NavLink>
            <NavLink to='/admin/sending_letters'>Sending Letters</NavLink>
            <NavLink to='/admin/courses'>Courses</NavLink>
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