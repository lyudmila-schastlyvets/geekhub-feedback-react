import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logo from './../images/teacher.png'

class CommentForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      warning: false
    }

    this.handleTextareaChange = this.handleTextareaChange.bind(this)
  }

  handleTextareaChange(e) {
    if (e.target.value.length === 500) {
      this.setState({
        warning: true
      })
    } else {
      this.setState({
        warning: false
      })
    }
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
            maxLength='500'
            onChange={this.handleTextareaChange}

          />
          <div className='error-notification'>
            {this.state.warning ? 'Too long feedback, limit 500 symbols' : ''}
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(CommentForm)