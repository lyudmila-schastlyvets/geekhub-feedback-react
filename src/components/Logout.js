import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'

class Logout extends Component {
  constructor(props) {
    super(props)

    this.logoutFunc = this.logoutFunc.bind(this)
  }

  logoutFunc() {
    localStorage.setItem('loggedIn', 'false')
    // this.props.loggedIn = 'false'
    // this.props.setState({
    //   loggedIn: 'false'
    // })
    return <Redirect to='/login'/>;

  }

  render() {
    return (
      !this.props.loggedIn ? '' :
      <button
        className="btn btn-primary"
        onClick={this.logoutFunc}>
        Logout
      </button>
    )
  }
}

export default withRouter(Logout)