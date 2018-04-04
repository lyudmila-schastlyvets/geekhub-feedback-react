import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logo from './../images/teacher.png'

class CommentForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: ''
    }

    this.handleTextareaChange = this.handleTextareaChange.bind(this)
  }

  handleTextareaChange(e) {
    this.props.change(e.target.value, this.props.teacher, this.props.index)
  }

  render() {
    return (
      <div className='col-md-6 single-comment-box'>
        <div className='info'>
          <div className='image'>
            <img src={this.props.teacher.image || logo} alt=''/>
          </div>
          <div className='info-data'>
            <h2>{this.props.teacher.name}</h2>
            <h3>{this.props.teacher.course}</h3>
          </div>
        </div>
        <div>
          <textarea
            className='form-control mg-bottom'
            name='pass'
            placeholder='Please be free to leave the truth comment'
            rows='6'
            onChange={this.handleTextareaChange}
          />
        </div>
      </div>
    )
  }
}

export default withRouter(CommentForm)