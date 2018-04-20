import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import update from 'immutability-helper'
import API from '../api'

class FormTeacher extends Component {
    constructor(props) {
        super(props)
        this.state = {
            course: {
                name: '',
                _id: ''
            },
            errors: {
                name: '',
            },
            edit: false,
            success: false
        }

        this.dataChange = this.dataChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    dataChange({target: {value, name}}) {
        this.setState({
            course: update(this.state.course, {
                [name]: {$set: value}
            })
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        this.setState({
            course: {
                name: this.state.course.name,
                _id: this.state.course._id
            }
        })
        // check if 'name' is empty write error
        if (!this.state.course.name) {
            this.state.errors.name = 'Name is required'
        } else {
            this.state.errors.name = ''
        }
        const course = this.state.course
        // check errors exist
        if (this.state.errors.name) {
            this.state.success = false
        } else {
            // check add or edit teacher
            if (!this.state.edit) {
                API.post('course', {
                    name: course.name
                })
                    .catch(function (error) {
                        console.log(error)
                    })
                this.state.success = true
            } else {
                API.put(`course/${this.state.course._id}`,
                    {
                        name: course.name
                    })
                    .catch(errors => console.log(errors))
                this.setState({
                    course: {
                        name: course.name
                    }
                })
                this.state.success = true
            }
        }
        // resetting data
        if (this.state.success && !this.state.edit) {
            this.setState({
                course: {
                    name: '',
                }
            })
        }
    }

    componentDidMount() {
        // if edit get data of teacher
        if (this.props.match.params.id) {
            API.get(`course/${this.props.match.params.id}`)
                .then(function (response) {
                    this.setState({
                        course: response.data
                    })

                }.bind(this))
                .catch(function (error) {
                    console.log(error)
                })
            this.setState({
                edit: true
            })
        }
    }

    render() {
        return (
            <div>
                <h2>Course form</h2>
                <form className='course-form'>
                    <input
                        className='required form-control'
                        name='name'
                        type='text'
                        placeholder='Name'
                        value={this.state.course.name}
                        onChange={this.dataChange}
                    />
                    <div className='error-notification'>
                        {this.state.errors.name}
                    </div>
                    <input
                        className='btn btn-primary'
                        type='submit'
                        value='Save'
                        onClick={this.handleSubmit}
                    />
                    <div className='form-success'>
                        {this.state.success ?
                            (this.state.edit ?
                                'Course edited!' :
                                'Course created!') :
                            ''
                        }
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(FormTeacher)