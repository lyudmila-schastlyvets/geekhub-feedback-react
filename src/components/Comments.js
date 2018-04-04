import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
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
      errorMessage: '',
      wasSent: 'true'
    }

    this.commentsSubmit = this.commentsSubmit.bind(this)
    this.changeComponent = this.changeComponent.bind(this)
  }

  componentWillMount() {
    API.get('feedback/' + this.props.match.params.id)
      .then(function (res) {
        this.setState({
          wasSent: res.data.wasSent,
          teachers: res.data.result
        })
      }.bind(this))
      .catch(function (err) {
        console.log(err)
      })
  }

  changeComponent(message, teacher, index) {
    let test = update(this.state, {
      comments: {
        [index]: {
          $set: {
            teacherID: teacher._id,
            name: teacher.name,
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
      let comments = []
      this.state.comments.map((comment) => {
        comments.push({
          "forTeacher": comment.teacherID,
          "content": comment.message,
          "teacherName": comment.name,
          "date": (new Date()).toString()
        })
      })
      API.post('setcomment/', {
        "comments": comments,
        "user": this.props.match.params.id
      })
        .then(function (res) {
          console.log(res)
        })
        .catch(function (err) {
          console.log(err)
        })
    } else {
      this.setState({
        errorMessage: 'Please fill in required data'
      })
    }
  }

  render() {
    return (
      <div className='container'>
        {this.state.wasSent === 'true' ? (
            <div>
              <h1>Comment Page Heading</h1>
              <p>Some text will be here</p>
              <div className='row'>
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
                className='btn btn-primary'
                onClick={this.commentsSubmit}
              >Leave Comment</button>
            </div>
          ) : (<Redirect to='/'/>)
        }
      </div>
    )
  }
}

export default withRouter(Comments)