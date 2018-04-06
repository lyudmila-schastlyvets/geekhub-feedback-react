import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import API from './../api'
import CommentForm from './CommentForm'

class AdditionalFeedback extends Component {
  constructor(props) {
    super(props)
    this.state = {
      teachersForAdding: []
    }

    this.addFeedBackFunction = this.addFeedBackFunction.bind(this)
    this.selectChange = this.selectChange.bind(this)
  }

  componentWillMount() {
    API.get('teacher')
      .then(function (res) {
        this.setState({
          teachersForAdding: res.data
        })
      }.bind(this))
      .catch(function (error) {
        console.log(error)
      })
  }

  addFeedBackFunction() {
    console.log('add feedback')
  }

  selectChange(e) {
    this.props.handleSelectChange(e.target.value, e.target.id)
  }

  render() {
    return (
      <div className='container'>
        <button
          onClick={this.addFeedBackFunction}
          className='btn btn-primary mg-bottom'
        >Add Feedback</button>
        <select
          name='teacher'
          className='custom-select col-lg-4'
          onChange={this.selectChange}
        >
          <option value='0'>Choose the teacher</option>
          {this.state.teachersForAdding.map((teacher) => (
            <option key={teacher._id}
                    value={teacher._id}>{teacher.name}</option>)
          )}
        </select>
      </div>
    )
  }
}

export default withRouter(AdditionalFeedback)