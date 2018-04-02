import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class CommentForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errorMessage: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleTextareaChange = this.handleTextareaChange.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()

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
        <h2>{this.props.teacher.name}</h2>
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
          </form>
        </div>
      </div>
    )
  }
}

export default withRouter(CommentForm)