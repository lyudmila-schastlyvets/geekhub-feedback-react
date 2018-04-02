import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
// import { EMAIL_VALIDATION_REGEX } from './../constants'
// import API from './../api'
import CommentForm from './CommentForm'


class Comments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      commentFormsNumber: 0,

    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    // let localThis = this;

  }

  handleSelectChange(e) {

  }

  render() {
    return (
      <div>
        <h1>Comment Page Heading</h1>
        <CommentForm />
      </div>
    )
  }
}

export default withRouter(Comments)