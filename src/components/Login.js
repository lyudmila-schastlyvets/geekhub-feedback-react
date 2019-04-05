import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import sha256 from 'crypto-js/sha256'
import API from './../api'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      pass: '',
      loggedIn: localStorage.getItem('loggedIn'),
      errorMessage: ''
    }

    this.nameChange = this.nameChange.bind(this)
    this.passChange = this.passChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  nameChange(event) {
    this.setState({name: event.target.value})
  }

  passChange(event) {
    this.setState({pass: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    let password = this.state.pass
    API.get('salt?login=' + this.state.name)
      .then(function(response) {
        if (response.data) {
          password = sha256(this.state.pass + response.data).toString()
          API.post('login?login=' + this.state.name + '&password=' + password)
            .then(function (response) {
              if (response.data) {
                localStorage.setItem('loggedIn', 'true')
                this.setState({
                  loggedIn: 'true',
                  errorMessage: ''
                })
              } else {
                this.setState({
                  errorMessage: 'Please check entered data'
                })
              }
            }.bind(this))
            .catch(function (error) {
                console.log('error ' + error)
              }
            )
        } else {
          this.setState({
            errorMessage: 'Please check entered data'
          })
        }
      }.bind(this))
      .catch(function (error) {
        console.log('error ' + error)
      })
  }

  render() {
    return (
      <div>
        {this.state.loggedIn === 'true' ? (<Redirect to="/" />) : (<h1>Login</h1>) }
        <div className='login-page'>
          <form className="login-form">
            <input
              className='form-control'
              name='name'
              type='text'
              placeholder='Name'
              onChange={this.nameChange}
              required='required'
            />
            <input
              className='form-control'
              name='pass'
              type='password'
              placeholder='Password'
              onChange={this.passChange}
              required='required'
            />
            {this.state.errorMessage && <p className='error-notification'>
              {this.state.errorMessage}</p>}
            <input
              type='submit'
              value='Submit'
              onClick={this.handleSubmit}
              className='btn btn-primary'
            />
          </form>
        </div>
      </div>
    )
  }
}

export default withRouter(Login)