import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import API from './../api'
import CommentForm from './CommentForm'
import update from 'immutability-helper'

class Comments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      commentFormsNumber: 0,
      teachers: [],
      comments: [],
      errorMessage: ''
    }

    this.commentsSubmit = this.commentsSubmit.bind(this)
    this.changeComponent = this.changeComponent.bind(this)
  }

  componentDidMount() {
    API.get('feedback/' + this.props.match.params.id)
      .then(function (res) {
        this.setState({
          teachers: res.data.result,
          commentator: res.data.id
        })
      }.bind(this))
      .catch(function (err) {
        console.log(err)
      })
  }

  changeComponent(message, teacherID, index) {
    let test = update(this.state, {
      comments: {
        [index]: {
          $set: {
            teacherID: teacherID,
            message: message
          }
        }
      }
    })
    this.setState(test)
  }

  commentsSubmit() {
    this.setState({
      errorMessage: ''
    })
    if (this.state.comments.length === this.state.commentFormsNumber) {
      console.log(this.state.comments)
      this.state.comments.map((comment) => {
        API.post('setcomment/', {
          "forTeacher": comment.teacherID,
          "content": comment.message,
          "date": new Date()
        })
          .then(function (res) {
            console.log(res)
          })
          .catch(function (err) {
            console.log(err)
          })
      })
    } else {
      this.setState({
        errorMessage: 'Please fill in required data'
      })
    }
  }

  render() {
    return (
      <div className="container">
        <h1>Comment Page Heading</h1>
        <p>Some text will be here</p>
        <div className="row">
          {this.state.teachers.map((teacher, index) => {
              this.state.commentFormsNumber = index + 1
              return <CommentForm
                key={teacher._id}
                teacher={teacher}
                change={this.changeComponent}
                index={index}
              />
            }
          )}
        </div>
        {this.state.errorMessage !== '' ? <p className='error-notification'>{this.state.errorMessage}</p> : ''}
        <button
          className="btn btn-primary"
          onClick={this.commentsSubmit}
        >Leave Comment</button>
      </div>
    )
  }
}

export default withRouter(Comments)