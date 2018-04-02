import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import update from 'immutability-helper'
import API from '../api'

class addTeacher extends Component {
    constructor(props) {
        super(props)
        this.state = {
            teacher: {
                name: '',
                course: '',
                image: ''
            },
            errors: {
                name: '',
                course: ''
            },
            courses: [
                'Frontend + CMS',
                'Frontend + JS',
                'Online Marketing',
                'Advanced PHP',
                'Javascript',
                'Java for Web',
                'Ruby on Rails',
                'Python',
                'Quality Assurance',
                'Advanced Android',
                'Project Management',
                'Motion Graphics'
            ]
        }

        this.dataChange = this.dataChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    dataChange({target: {value, name}}) {
        this.setState({
            teacher: update(this.state.teacher, {
                [name]: {$set: value}
            })
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        this.setState({
            teacher: {
                name: this.state.teacher.name,
                course: this.state.teacher.course,
                image: this.state.teacher.img
            }
        })
        // check if 'name' is empty write error
        if (!this.state.teacher.name) {
            this.state.errors.name = 'Name is required'
        } else {
            this.state.errors.name = ''
        }
        // check if 'course' is empty write error
        if (!this.state.teacher.course) {
            this.state.errors.course = 'Course is required'
        } else {
            this.state.errors.course = ''
        }
        const teacher = this.state.teacher
        if (!this.state.errors.name &&
            !this.state.errors.course &&
            (!this.state.errors.course && !this.state.errors.name)) {
            API.post('teacher', {
                name: teacher.name,
                course: teacher.course,
                image: teacher.image
            })
                .then(function (response) {
                    console.log(response)
                })
                .catch(function (error) {
                    console.log(error)
                })
            this.setState({
                teacher: {
                    name: '',
                    course: '',
                    image: ''
                }
            })
        }
    }

    render() {
        return (
            <div>Teacher form
                <form>
                    <input
                        className='required'
                        name='name'
                        type='text'
                        placeholder='Name'
                        value={this.state.teacher.name}
                        onChange={this.dataChange}
                    />
                    <div className='errors'>
                        {this.state.errors.name}
                    </div>
                    <input
                        name='image'
                        type='file'
                        value={this.state.teacher.image}
                        onChange={this.dataChange}
                    /><br/>
                    <select name='course'
                            value={this.state.teacher.course}
                            onChange={this.dataChange}>
                        {this.state.courses.map(function (course, key) {
                            return (<option key={key} value={course}>{course}</option>)
                        })}
                    </select>
                    <div className='errors'>
                        {this.state.errors.course}
                    </div>
                    <input
                        type='submit'
                        value='Save'
                        onClick={this.handleSubmit}
                    />
                </form>
            </div>
        )
    }
}

export default withRouter(addTeacher)