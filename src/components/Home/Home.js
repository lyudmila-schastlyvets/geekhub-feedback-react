import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export default class Home extends Component {
  render () {
      return (
        localStorage.getItem('loggedIn') === 'true' ? (
        <div>
          <h1>Home</h1>
          <p>Welcome to Geekhub feedback system!</p>
        </div> ) : (<Redirect to="/login" />)
      )
  }
}