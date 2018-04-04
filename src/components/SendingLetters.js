import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import SelectTeacherComponent from './SelectTeacherComponent'
import { EMAIL_VALIDATION_REGEX } from './../constants'
import API from "../api"
import update from 'immutability-helper'

class SendingLetters extends Component {
  constructor(props) {
    super(props)
    this.state = {
      teachers: [],
      chosenTeachers: [],
      emails: '',
      errorMessage: {}
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleTextareaChange = this.handleTextareaChange.bind(this)
  }

  componentWillMount () {
    API.get('teacher')
      .then(function (response) {
        this.setState({
          teachers: response.data
        })
      }.bind(this))
      .catch(function (error) {
          console.log('error ' + error)
        }
      )
  }

  handleSubmit(event) {
    event.preventDefault()
    // Filter selected results. Remove "Choose teacher" values and leave only unique values.
    let filteredChosenTeachers = this.state.chosenTeachers.filter((el) =>  el !== '0')
    filteredChosenTeachers = [...new Set(filteredChosenTeachers)]
    // Init variable for error messages.
    let errors = {}
    // Init variable for emails.
    let emailsArray = []
    // Check if the teachers were chosen.
    if (!filteredChosenTeachers.length > 0) {
      errors['errorTeachers'] = 'Please choose the teacher'
    }
    // Check if emails were entered.
    if (this.state.emails === '') {
      errors['errorEmails'] = 'Email address is required'
      this.setState({
        errorMessage: errors
      })
      return
    }
    // Validation entered emails.
    let str = this.state.emails.split(', ');

    str.forEach(function (el) {
      if (errors.errorEmails) {
        return
      } else {
        if (!EMAIL_VALIDATION_REGEX.test(el)) {
          errors['errorEmails'] = 'Enter correct email(s)'
        } else {
          emailsArray.push(el.toString())
        }
      }
    })
    // Show errors after custom validation
    if (errors.errorEmails || errors.errorTeachers) {
      this.setState({
        errorMessage: errors
      })
      return
    }
    // Send data top API
    API.post('sendmail', {
      "emails": emailsArray,
      "teachers": filteredChosenTeachers
    })
      .then(function (res) {
        console.log(res)
      })
      .catch(function (err) {
        console.log(err)
      })

    // Page refresh TODO
    window.location.reload();
  }

  handleSelectChange(value, id) {
    this.setState({
      chosenTeachers: update(this.state.chosenTeachers, {
        [id]: {$set: value}
      })
    })
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
          <form>
            <SelectTeacherComponent
              count={this.state.count}
              teachers={this.state.teachers}
              handleSelectChange={this.handleSelectChange}
            />
            <div className='single-form-row row justify-content-md-center'>
              {this.state.errorMessage.errorTeachers ? <p className='col-12 error-notification'>
                {this.state.errorMessage.errorTeachers}</p> : ''}
              <textarea
                className='form-control col-lg-4'
                name='pass'
                placeholder='Enter email addresses separated by commas'
                rows='6'
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

export default withRouter(SendingLetters)