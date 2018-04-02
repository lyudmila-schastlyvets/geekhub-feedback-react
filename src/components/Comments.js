import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
// import API from './../api'
import CommentForm from './CommentForm'


class Comments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      commentFormsNumber: 0,
      teachers: []
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    // API.get('teacher' + this.props.match.params.id)
    // console.log(this.props.match.params.id)
    const teachers = [
      {
        name: "Kina",
        course: "JS",
        id: "5ac1e517d095760004605a11",
        image: "url"
      },
      {
        name: "Somebody",
        course: "Online Marketing",
        id: "5ac13ea927256400040a3197",
        image: "url"
      }
    ]
    this.setState({
      teachers: teachers
    })
  }

  handleSubmit(event) {
    event.preventDefault()

  }

  handleSelectChange(e) {

  }

  render() {
    return (
      <div>
        {console.log(this.state.teachers)}
        <h1>Comment Page Heading</h1>
        {this.state.teachers.map((teacher) => <CommentForm key={teacher.id} teacher={teacher}/>)}
        <button className="btn btn-primary">Leave Comment</button>
      </div>
    )
  }
}

export default withRouter(Comments)