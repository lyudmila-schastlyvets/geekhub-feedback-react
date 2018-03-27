import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import update from 'immutability-helper'

class addTeacher extends Component {
    constructor(props) {
        super(props)
        this.state = {
            teacher: {
                name: '',
                img: '',
                course: ''
            },
            errors: {
                required: ''
            }
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
                name: this.state.name,
                img: this.state.img,
                course: this.state.course
            },
            errors: {
                required: this.state.required
            }
        })
        // check if 'name' is empty write error
        if (!this.state.teacher.name) {
            this.state.errors.required = 'Name is required'
        } else {
            this.state.errors.required = ''
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
                        value={this.state.name}
                        onChange={this.dataChange}
                    /><br/>
                    <input
                        name='img'
                        type='file'
                        value={this.state.img}
                        onChange={this.dataChange}
                    /><br/>
                    <select name='course'
                            value={this.state.course}
                            onChange={this.dataChange}>
                        <option value="Frontend + CMS">Frontend + CMS</option>
                        <option value="Frontend + JS">Frontend + JS</option>
                        <option value="Online Marketing">Online Marketing</option>
                        <option value="Advanced PHP">Advanced PHP</option>
                        <option value="Javascript">Javascript</option>
                        <option value="Java for Web">Java for Web</option>
                        <option value="Ruby On Rails">Ruby on Rails</option>
                        <option value="Python">Python</option>
                        <option value="Quality Assurance">Quality Assurance</option>
                        <option value="Advanced Android">Advanced Android</option>
                        <option value="Project Management">Project Management</option>
                        <option value="Motion Graphics">Motion Graphics</option>
                    </select><br/>
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