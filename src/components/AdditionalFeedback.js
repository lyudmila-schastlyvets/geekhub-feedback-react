import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import API from './../api'
import CommentForm from './CommentForm'

class AdditionalFeedback extends Component {
  constructor(props) {
    super(props)
    this.state = {
      addedFeedback: false,
      chosenTeacher: false,
      addedTeacher: '',
      teacher: {}
    }

    this.addFeedBackFunction = this.addFeedBackFunction.bind(this)
    this.selectChange = this.selectChange.bind(this)
    this.chosenTeacher = this.chosenTeacher.bind(this)
  }

  addFeedBackFunction() {
    this.setState({
      addedFeedback: true
    })
  }

  chosenTeacher() {
    if (this.state.addedTeacher > 0) {
      this.setState({
        chosenTeacher: true
      })
      this.props.addedTeacher()
      API.get('teacher/' + this.state.addedTeacher)
        .then(function(res) {
          this.setState({
            teacher: res.data
          })
        }.bind(this))
        .catch(function (err) {
          console.log(err)
        })
    } else {
      alert('Оберіть викладача!')
    }
  }

  selectChange(e) {
    this.props.handleSelectChange(e.target.value)
    this.setState({
      addedTeacher: e.target.value
    })
  }

  render() {
    return (
      <div className='row'>
        {!this.state.addedFeedback && <div className='col additional-teacher'>
          <button
            onClick={this.addFeedBackFunction}
            className='btn btn-primary mg-bottom'
          >Додати відгук</button>
        </div>}
        {this.state.addedFeedback && !this.state.chosenTeacher && <div className='col additional-teacher'>
          <select
            name='teacher'
            className='custom-select col-lg-4'
            onChange={this.selectChange}
          >
            <option value='0'>Choose the teacher</option>
            {this.props.teachers.map((teacher) => (
              <option key={teacher._id}
                      value={teacher._id}>{teacher.name}</option>)
            )}
          </select>
          <button
            onClick={this.chosenTeacher}
            className='btn btn-primary mg-bottom'
          >Обрати</button>
        </div>}
        {this.state.chosenTeacher && <CommentForm
          teacher={this.state.teacher}
          change={this.props.change}
          index={this.props.index}
        />
        }
      </div>
    )
  }
}

export default withRouter(AdditionalFeedback)