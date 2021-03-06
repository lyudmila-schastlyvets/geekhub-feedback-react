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
            courses: [],
            file: null,
            errors: {
                name: '',
                course: ''
            },
            edit: false,
            success: false
        }

        this.dataChange = this.dataChange.bind(this)
        this.onFileChange = this.onFileChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
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
        API.get('course/')
            .then(function (response) {
                this.setState({
                    courses: response.data
                })
            }.bind(this))
            .catch(function (error) {
                    console.log('error ' + error)
                }
            )
    }

    dataChange({target: {value, name}}) {
        this.setState({
            teacher: update(this.state.teacher, {
                [name]: {$set: value}
            })
        })
    }

    onFileChange(e) {
        this.setState({file: e.target.files[0]})
    }

    handleSubmit(event) {
        event.preventDefault()
        this.setState({
            teacher: {
                name: this.state.teacher.name,
                course: this.state.teacher.course,
                image: this.state.teacher.img,
                _id: this.state.teacher._id
            },
            success: false
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
      console.log(teacher)
        // check errors exist
        if (this.state.errors.name ||
            this.state.errors.course ||
            (this.state.errors.course && this.state.errors.name)) {
            this.state.success = false
        } else {
            // check add or edit teacher
            if (!this.state.edit) {
                const formData = new FormData()
                formData.append('sampleFile', this.state.file)
                const config = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                }
                // check image upload
                if (this.state.file) {
                    API.post('upload', formData, config)
                        .then((response) => {
                            if (response) {
                                API.post('teacher', {
                                    name: teacher.name,
                                    course: teacher.course,
                                    image: response.data.url
                                })
                                    .then(res => {
                                        this.setState({
                                            success: true
                                        })
                                    })
                                    .catch(function (error) {
                                        console.log(error)
                                    })
                            }
                        })
                        .catch(function (error) {
                            console.log(error)
                        })
                } else {
                    // add without image
                    API.post('teacher', {
                        name: teacher.name,
                        course: teacher.course
                    })
                        .then(res => {
                            this.setState({
                                success: true
                            })
                        })
                        .catch(function (error) {
                            console.log(error)
                        })
                }
                // resetting data
                this.setState({
                    teacher: {
                        name: '',
                        course: '',
                        image: ''
                    },
                    file: null
                })
                this.refs.fileInput.value = ''
            } else {
                const formData = new FormData()
                formData.append('sampleFile', this.state.file)
                const config = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                }
                // check image upload
                if (this.state.file) {
                    API.post('upload', formData, config)
                        .then((response) => {
                            if (response) {
                                API.put(`editteacher/${this.state.teacher._id}`,
                                    {
                                        name: teacher.name,
                                        course: teacher.course,
                                        image: response.data.url,
                                        _id: teacher._id
                                    })
                                    .then(res => {
                                        this.setState({
                                            success: true
                                        })
                                    })
                                    .catch(errors => console.log(errors))
                            }
                        })

                } else {
                    // edit without image
                    API.put(`editteacher/${this.state.teacher._id}`,
                        {
                            name: teacher.name,
                            course: teacher.course,
                            image: teacher.image,
                        })
                        .then(res => {
                            this.setState({
                                teacher: {
                                    name: teacher.name,
                                    course: teacher.course,
                                    image: teacher.image,
                                    _id: teacher._id
                                },
                                success: true
                            })
                        })
                        .catch(errors => console.log(errors))
                }
            }
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
                            return (<option key={key} value={course.name}>{course.name}</option>)
                        })}
                    </select>
                    <div className='error-notification'>
                        {this.state.errors.course}
                    </div>
                    <div className='upload-file'>
                        <input
                            name='image'
                            type='file'
                            value={this.state.image}
                            onChange={this.onFileChange}
                            ref='fileInput'
                        />
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