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
    this.selectChange = this.selectChange.bind(this)
  }

  selectChange(e) {
    this.props.handleSelectChange(e.target.value, e.target.id)
  }

  addSelectFunction(e) {
    let teachers = this.props.teachers
    e.preventDefault()
    this.setState({
      count: this.state.count + 1
    })
    this.state.selects.push(
      <select
        name='teacher'
        id={this.state.count}
        className='custom-select col-lg-4'
        onChange={this.selectChange}
      >
        <option value='0'>Choose the teacher</option>
      {teachers.map((teacher) => (
        <option key={teacher._id}
                value={teacher._id}>{teacher.name}</option>)
      )}
    </select>
    )
  }

  render() {
    return (
      <div>{
        this.state.count < 3 && <button
          className='mg-bottom btn btn-primary'
          onClick={this.addSelectFunction}>Add teacher</button>
      }
        {this.state.selects.map(function (el, index) {
          return (
            <div className='single-form-row row justify-content-md-center' key={index}>
              {el}
            </div>
          )
        })}
      </div>

    )
  }
}

export default withRouter(SelectTeachersComponent)