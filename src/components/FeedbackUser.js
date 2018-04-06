import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import API from './../api'
import Comments from './Comments'
import AdditionalFeedback from './AdditionalFeedback'

class feedbackUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      additionalTeachers: []
    }

  }

  componentWillMount() {
    API.get('teacher')
      .then(function (res) {
        console.log(res.data)

      }.bind(this))
      .catch(function(error) {
        console.log(error)
      })

  }

  render() {
    return (
      <div className='container'>
        <Comments />
        <AdditionalFeedback />
      </div>
    )
  }
}

export default withRouter(feedbackUser)