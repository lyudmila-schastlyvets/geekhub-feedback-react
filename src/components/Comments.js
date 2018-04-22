import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import API from './../api'
import update from 'immutability-helper'
import AdditionalFeedback from './AdditionalFeedback'
import CommentForm from './CommentForm'
import PageUpload from './PageUpload'
import NotFound from './NotFound'

class Comments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      commentFormsNumber: 0,
      teachers: [],
      comments: [],
      errorMessage: '',
      wasSent: '',
      teachersList: [],
      addedTeacher: false
    }

    this.commentsSubmit = this.commentsSubmit.bind(this)
    this.changeComponent = this.changeComponent.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.addedTeacher = this.addedTeacher.bind(this)
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
        this.setState({
          wasSent: 'error'
        })
        console.log(err)
      }.bind(this))
    API.get('teacher')
      .then(function (res) {
        this.setState({
          teachersList: res.data
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

  handleSelectChange(value) {
    this.setState({
      chosenTeacher: value
    })
  }

  addedTeacher() {
    this.setState({
      addedTeacher: true
    })
  }

  commentsSubmit() {
    this.setState({
      errorMessage: ''
    })
    let formsNumber = this.state.commentFormsNumber
    if (this.state.addedTeacher)
      formsNumber++
    if (this.state.comments.length === formsNumber) {
      let comments = []
      this.state.comments.map((comment) =>
        comments.push({
          "forTeacher": comment.teacherID,
          "content": comment.message,
          "teacherName": comment.name,
          "date": (new Date()).toString()
        })
      )
      API.post('setcomment/', {
        "comments": comments,
        "user": this.props.match.params.id
      })
        .then(function (res) {
          if (res.status === 200)
            this.setState({
              wasSent: 'sent'
            })
        }.bind(this))
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
    let teachersToRemove =[]
    return (
      <div className='container'>
        {(() => {
          switch (this.state.wasSent) {
            case 'true':
              return <div>
              <h1>Залиште свій відгук!</h1>
              <p>Для покращення роботи нам дуже важливо отримати думку кожного про викладачів команди Geekhub</p>
              <div className='row'>
                {this.state.teachers.map((teacher, index) => {
                  this.state.commentFormsNumber = index + 1
                  teachersToRemove.push(teacher._id)
                  return <CommentForm
                    key={teacher._id}
                    teacher={teacher}
                    change={this.changeComponent}
                    index={index}
                  />
                  }
                )}
              </div>
              <p>Також ви можете лишити свої враження від викладача,
                з яким ви спілкувались під час навчання на курсах.
                Для цього достатньо натиснути кнопку нижче.</p>
              <AdditionalFeedback
                teachers={this.state.teachersList.filter((el) => !teachersToRemove.includes( el._id ))}
                handleSelectChange={this.handleSelectChange}
                change={this.changeComponent}
                index={this.state.teachers.length}
                addedTeacher={this.addedTeacher}
              />
              {this.state.errorMessage !== '' && <p className='error-notification'>{this.state.errorMessage}</p>}
              <button
                className='btn btn-primary mg-bottom'
                onClick={this.commentsSubmit}
              >Залишити відгуки</button>
            </div>
            case 'false':
              return <div className='centered-content'>
              <h2>Ми вже отримали Ваш відгук!</h2>
              <p>Повторно залишити чи змінити повідомлення неможливо.</p>
            </div>
            case 'sent':
              return <div className='centered-content'>
              <h2>Ви успішно відправили відгук!</h2>
              <p>Ваша думка для нас дуже важлива.</p>
            </div>
            case 'error':
              return <NotFound/>
            default:
              return <PageUpload/>
          }
        })()}
      </div>
    )
  }
}

export default withRouter(Comments)