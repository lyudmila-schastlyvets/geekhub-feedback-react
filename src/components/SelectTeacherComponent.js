import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class SelectTeachersComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
      selects: []
    }

    this.addSelectFunction = this.addSelectFunction.bind(this)

  }

  addSelectFunction(e) {
    let teachers = this.props.teachers
    let handleSelectChange = this.props.handleSelectChange
    e.preventDefault()
    this.setState({
      count: this.state.count + 1
    })
    this.state.selects.push(
      <select
      name="teacher"
      id="teacher_select"
      className='custom-select col-lg-4'
      onChange={handleSelectChange}
      key={this.state.count}
    >
      {teachers.map((teacher) => (
        <option key={teacher._id}
                value={teacher.name}>{teacher.name}</option>)
      )}
    </select>
    )
  }

  render() {
    return (
      <div>
        <button
          className="mg-bottom btn btn-primary"
          onClick={this.addSelectFunction}>Add teacher</button>
          {this.state.selects.map(function (el) {
            return (
              <div className="single-form-row row justify-content-md-center ">
                {el}
              </div>
            )
          })}
      </div>

    )
  }
}

export default withRouter(SelectTeachersComponent)