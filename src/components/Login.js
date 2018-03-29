import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from './../constants'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      pass: '',
      loggedIn:localStorage.getItem('loggedIn')
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
    // let localThis = this;
    event.preventDefault()
    axios.post(API_URL + '/login?login=' + this.state.name + '&password=' + this.state.pass)
      .then(function (response) {
        if (response.data) {
          // this.props.loggedIn = 'true'
          // localThis.setState({
          //   loggedIn: 'true'
          // })
          localStorage.setItem('loggedIn', 'true')
        }
      })
      .catch(function (error) {
          console.log('error ' + error);
        }
      );
  }

  render() {
    return (
      <div>
        {localStorage.getItem('loggedIn') === 'true' ? (<Redirect to="/" />) : (<h1>Login</h1>) }
        <div className='form'>
          <form>
            <input
              className='required'
              name='name'
              type='text'
              placeholder='Name'
              onChange={this.nameChange}
              required='required'
            />
            <input
              className='required'
              name='pass'
              type='text'
              placeholder='Password'
              onChange={this.passChange}
              required='required'
            />
            <input
              type='submit'
              value='Submit'
              onClick={this.handleSubmit}
            />
          </form>
        </div>
      </div>
    )
  }
}

export default withRouter(Login)