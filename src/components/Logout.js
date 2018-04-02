import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'

class Logout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: localStorage.getItem('loggedIn')
    }

    this.logoutFunc = this.logoutFunc.bind(this)
  }

  logoutFunc() {
    localStorage.setItem('loggedIn', 'false')
    this.setState({
      loggedIn: 'false'
    })
  }

  render() {
    return (
      this.state.loggedIn !== 'true' ? <Redirect to='/admin/login'/> :
      <button
        className="btn btn-primary"
        onClick={this.logoutFunc}>
        Logout
      </button>
    )
  }
}

export default withRouter(Logout)