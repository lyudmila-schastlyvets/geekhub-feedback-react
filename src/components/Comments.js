import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import API from './../api'
import CommentForm from './CommentForm'
import update from 'immutability-helper'
import SelectTeacherComponent from './SelectTeacherComponent'

class Comments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      commentFormsNumber: 0,
      teachers: [],
      comments: [],
      errorMessage: '',
      wasSent: '',
      addedFeedbacks: 0,
      addedTeachers: []
    }

    this.commentsSubmit = this.commentsSubmit.bind(this)
    this.changeComponent = this.changeComponent.bind(this)
    this.addFeedBackFunction = this.addFeedBackFunction.bind(this)
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
    API.get('teacher')
      .then(function (res) {
        this.setState({
          teachersForAdding: res.data
        })
      }.bind(this))
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
          this.setState({
            wasSent: 'sent'
          })
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

  addFeedBackFunction() {
    console.log('add feedback')
  }

  render() {
    return (
      <div className='container'>
        {(() => {
          switch (this.state.wasSent) {
            case "true":
              return <div>
              <h1>Comment Page Heading</h1>
              <p>Some text will be here</p>
              <button
                onClick={this.addFeedBackFunction}
                className='btn btn-primary mg-bottom'
              >Add Feedback</button>
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
                {this.state.addedTeachers.map((el) => (el))}
              </div>
              {this.state.errorMessage !== '' && <p className='error-notification'>{this.state.errorMessage}</p>}
              <button
                className='btn btn-primary mg-bottom'
                onClick={this.commentsSubmit}
              >Leave Comment</button>
            </div>
            case "false":
              return <div className='centered-content'>
              <h2>Ми вже отримали Ваш відгук!</h2>
              <p>Повторно залишити чи змінити повідомлення неможливо.</p>
            </div>
            case 'sent':
              return <div className='centered-content'>
              <h2>Ви успішно відправили відгук!</h2>
              <p>Ваша думка для нас дуже важлива.</p>
            </div>
            default:
              return <div className='centered-content'>
                <h2>Зачекайте!</h2>
                <p>Cторінка завантажується!</p>
              </div>
          }
        })()}
      </div>
    )
  }
}

export default withRouter(Comments)