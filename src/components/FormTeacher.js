import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import update from 'immutability-helper'
import API from '../api'

class FormTeacher extends Component {
    constructor(props) {
        super(props)
        this.state = {
            teacher: {
                name: '',
                course: '',
                image: '',
                _id: ''
            },
            file: null,
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
            ],
            edit: false,
            success: false
        }

        this.dataChange = this.dataChange.bind(this)
        this.onFileChange = this.onFileChange.bind(this)
        this.onFileSubmit = this.onFileSubmit.bind(this)
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
                image: this.state.teacher.img,
                _id: this.state.teacher._id
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
        // check errors exist
        if (!this.state.errors.name &&
            !this.state.errors.course &&
            (!this.state.errors.course && !this.state.errors.name)) {
            // check edit or add teacher
            if (!this.state.edit) {
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
                this.state.success = true
            } else {
                API.put(`editteacher/${this.state.teacher._id}`,
                    {
                        name: teacher.name,
                        course: teacher.course,
                        image: teacher.image
                    })
                    .then(res => {
                        console.log(res)
                        console.log(res.data)
                    })
                    .catch(errors => console.log(errors))
                this.state.success = true
            }
        }
        // resetting data
        if (this.state.success && !this.state.edit) {
            this.setState({
                teacher: {
                    name: '',
                    course: '',
                    image: ''
                }
            })
        }
    }

    onFileChange(e) {
        this.setState({file: e.target.files[0]})
    }

    onFileSubmit(event) {
        event.preventDefault()
        API.post('upload', this.state.file)
            .then((response) => {
                console.log(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    componentDidMount() {
        // if edit get data of teacher
        if (this.props.match.params.id) {
            API.get(`teacher/${this.props.match.params.id}`)
                .then(function (response) {
                    this.setState({
                        teacher: response.data
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
                <h2>Teacher form</h2>
                <form className='teacher-form'>
                    <input
                        className='required form-control'
                        name='name'
                        type='text'
                        placeholder='Name'
                        value={this.state.teacher.name}
                        onChange={this.dataChange}
                    />
                    <div className='error-notification'>
                        {this.state.errors.name}
                    </div>
                    <select
                        name='course'
                        value={this.state.teacher.course}
                        onChange={this.dataChange}
                        className='custom-select'
                    >
                        <option className='hide'>Choose the course</option>
                        {this.state.courses.map(function (course, key) {
                            return (<option key={key} value={course}>{course}</option>)
                        })}
                    </select>
                    <div className='error-notification'>
                        {this.state.errors.course}
                    </div>
                    <div className='upload-file'>
                        <input
                            name='image'
                            type='file'
                            onChange={this.onFileChange}
                        /><br/>
                        <button
                            type='submit'
                            onClick={this.onFileSubmit}
                        >Upload</button>
                    </div>
                    <input
                        className='btn btn-primary'
                        type='submit'
                        value='Save'
                        onClick={this.handleSubmit}
                    />
                    <div className='form-teacher-success'>
                        {this.state.success ?
                            (this.state.edit ?
                                'Teacher edited!' :
                                'Teacher created!') :
                            ''
                        }
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(FormTeacher)