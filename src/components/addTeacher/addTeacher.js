import React, {Component} from 'react'
import update from 'immutability-helper'

const CHECK_EMPTY = / /g

export default class addTeacher extends Component {
    constructor(props) {
        super(props)
        this.state = {
            teacher: {
                name: '',
                course: '',
                img: ''
            },
            errors: {
                required: ''
            }
        }

        this.teacherChange = this.teacherChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    teacherChange({target: {value, name}}) {
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
                course: this.state.course,
                img: this.state.img
            },
        })
        alert(this.state.teacher.name)
        if (!this.state.teacher.name.replace(CHECK_EMPTY, '')) {
            this.state.errors.errors = 'Name is required'
        }
        this.props.changeStateProps('teacher', this.state.teacher)
        this.props.changeStateProps('errors', this.state.errors)
    }

    render() {
        return (
            <div>Teacher form
                <form>
                    <input
                        name='name'
                        type='text'
                        placeholder='Name'
                        onChange={this.teacherChange}
                        value={this.state.name}
                    /><br/>
                    <select value={this.state.course}
                            onChange={this.teacherChange}>
                        <option value="FrontendCMS">Frontend + CMS</option>
                        <option value="FrontendJS">Frontend + JS</option>
                        <option value="OnlineMarketing">Online Marketing</option>
                        <option value="AdvancedPHP">Advanced PHP</option>
                        <option value="Javascript">Javascript</option>
                        <option value="Java">Java for Web</option>
                        <option value="RubyOnRails">Ruby on Rails</option>
                        <option value="Python">Python</option>
                        <option value="QualityAssurance">Quality Assurance</option>
                        <option value="AdvancedAndroid">Advanced Android</option>
                        <option value="ProjectManagement">Project Management</option>
                        <option value="MotionGraphics">Motion Graphics</option>
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