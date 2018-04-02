import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
// import { EMAIL_VALIDATION_REGEX } from './../constants'
import API from './../api'

class CommentForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      teachers: [],
      chosenTeachers: [],
      emails: '',
      errorMessage: {},
      emailsArray: []
    }

    this.handleSubmit = this.handleSubmit.bind(this)
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
    // let localThis = this;

  }

  handleSelectChange(e) {

  }

  handleTextareaChange(e) {
    this.setState({
      emails: e.target.value
    })
  }

  render() {
    return (
      <div>
        <h2>Comment About Teacher</h2>
        <div className='form container'>
          <form className="">
            <div className="single-form-row row justify-content-md-center">
              <p className='col-12 error-notification'>
              </p>
              <textarea
                className='form-control col-lg-4'
                name='pass'
                placeholder='Please be free to leave the truth comment'
                rows='3'
                onChange={this.handleTextareaChange}
              />
              <p className='col-12 error-notification'>
              </p>
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

export default withRouter(CommentForm)