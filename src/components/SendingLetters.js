import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import SelectTeacherComponent from './SelectTeacherComponent'
import { EMAIL_VALIDATION_REGEX } from './../constants'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: localStorage.getItem('loggedIn'),
      teachers: [],
      chosenTeachers: [],
      emails: '',
      errorMessage: ''
    }


    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleTextareaChange = this.handleTextareaChange.bind(this)
  }

  componentDidMount () {
    let localThis = this;
    axios.get('https://rocky-sands-24081.herokuapp.com/teacher')
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
      errorMessage: ''
    })
    if (this.state.emails === '') {
      localThis.setState({
        errorMessage: 'Email address is required'
      })
      return
    }
    let str = this.state.emails.split(', ');

    str.forEach(function (el) {
      if (localThis.state.errorMessage) {
        return
      } else {
        if (!EMAIL_VALIDATION_REGEX.test(el)) {
          localThis.setState({
            errorMessage: 'Enter correct email(s)'
          })
          return
        } else {
          console.log({
            "email": el.toString(),
            "teachers": localThis.state.chosenTeachers
          })
        }
      }
    })
    // axios.post('url', {
    //   "email": el.toString(),
    //   "teachers": this.state.teachers
    // })
    // axios.post('https://rocky-sands-24081.herokuapp.com/teacher', {
    //   name: 'Kirill Gusyatin',
    //   course: 'JS',
    //   image: 'String'
    // })
    //   .then(function (res) {
    //     console.log(res)
    //   })
    //   .catch(function (err) {
    //     console.log(err)
    //   })
  }

  handleSelectChange(e) {
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
              <textarea
                className='form-control col-lg-4'
                name='pass'
                placeholder='Enter email addresses separated by commas'
                rows='3'
                onChange={this.handleTextareaChange}
              />
              {this.state.errorMessage ? <p className='col-12 error-notification'>{this.state.errorMessage}</p> : ''}
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