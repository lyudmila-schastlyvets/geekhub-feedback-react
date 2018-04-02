import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import SelectTeacherComponent from './SelectTeacherComponent'
import { EMAIL_VALIDATION_REGEX } from './../constants'
import API from "../api";

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: localStorage.getItem('loggedIn'),
      teachers: [],
      chosenTeachers: [],
      emails: '',
      errorMessage: {},
      emailsArray: []
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleTextareaChange = this.handleTextareaChange.bind(this)
  }

  componentDidMount () {
    let localThis = this;
    API.get('teacher')
      .then(function (response) {
        localThis.setState({
          teachers: response.data
        })
      })
      .catch(function (error) {
          console.log('error ' + error);
        }
      );
  }

  handleSubmit(event) {
    event.preventDefault()
    let localThis = this;
    this.setState({
      errorMessage: {
        errorEmails: '',
        errorTeachers: ''
      }
    })
    if (this.state.emails === '') {
      localThis.setState({
        errorMessage: {
          errorEmails: 'Email address is required',
          errorTeachers: this.state.errorMessage.errorTeachers
        }
      })
      return
    }
    if (!localThis.state.chosenTeachers.length > 0) {
      localThis.setState({
        errorMessage: {
          errorEmails: this.state.errorMessage.errorEmails,
          errorTeachers: 'Please choose the teacher'
        }
      })
      return
    }
    let str = this.state.emails.split(', ');

    str.forEach(function (el) {
      if (localThis.state.errorMessage.errorEmails) {
        return
      } else {
        if (!EMAIL_VALIDATION_REGEX.test(el)) {
          localThis.setState({
            errorMessage: {
              errorEmails: 'Enter correct email(s)',
              errorTeachers: localThis.state.errorMessage.errorTeachers
            }
          })
          return
        } else {
          localThis.state.emailsArray.push(el.toString())
        }
      }
    })
    console.log({
      "emails": this.state.emailsArray,
      "teachers": this.state.chosenTeachers
    })
    API.post('sendmail', {
      "emails": this.state.emailsArray,
      "teachers": this.state.chosenTeachers
    })
      .then(function (res) {
        console.log(res)
      })
      .catch(function (err) {
        console.log(err)
      })
    this.setState({
      teachers: [],
      chosenTeachers: [],
      emails: '',
      errorMessage: {},
      emailsArray: []
    })
  }

  handleSelectChange(e) {
    if ( this.state.chosenTeachers.indexOf(e.target.value) === -1)
      this.state.chosenTeachers.push(e.target.value)
  }

  handleTextareaChange(e) {
    this.setState({
      emails: e.target.value
    })
  }

  render() {
    return (
      <div>
        <h1>Sending Letters</h1>
        <div className='form container'>
          <form className="">
            <SelectTeacherComponent
              count={this.state.count}
              teachers={this.state.teachers}
              handleSelectChange={this.handleSelectChange}
            />
            <div className="single-form-row row justify-content-md-center">
              {this.state.errorMessage.errorTeachers ? <p className='col-12 error-notification'>
                {this.state.errorMessage.errorTeachers}</p> : ''}
              <textarea
                className='form-control col-lg-4'
                name='pass'
                placeholder='Enter email addresses separated by commas'
                rows='3'
                onChange={this.handleTextareaChange}
              />
              {this.state.errorMessage.errorEmails ? <p className='col-12 error-notification'>
                {this.state.errorMessage.errorEmails}</p> : ''}
            </div>
            <input
              type='submit'
              className='btn btn-primary'
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