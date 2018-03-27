import React, {Component} from 'react'
import {Route, Link, withRouter} from 'react-router-dom'
import update from 'immutability-helper'

const CHECK_EMPTY = / /g

class Teachers extends Component {
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

    componentDidMount () {
        console.log('props in component', this.props)
    }

    teacherChange({target: {value, name, className}}) {
        this.setState({
            teacher: update(this.state.teacher, {
                [name]: {$set: value}
            })
        })
        if (className === 'required' && !value.replace(CHECK_EMPTY, '')) {
            this.setState({
                errors: update(this.state.errors, {
                    requiredError: {$set: 'Fill in required fields'}
                })
            })
        } else if (className === 'required') {
            this.setState({
                errors: update(this.state.errors, {
                    requiredError: {$set: ''}
                })
            })
        }
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
        if (!this.state.teacher.name.replace(CHECK_EMPTY, '')) {
            this.state.errors.required = 'Name is required'
        } else {
            this.state.errors.required = ''
        }

        this.props.changeStateProps('teacher', this.state.teacher)
        this.props.changeStateProps('errors', this.state.errors)
    }

    render() {
        return (
            <div>
                <h1>Teachers</h1>
                <Link to='/teachers/form'>Add teacher</Link>
                <div className='form'>
                    <Route path='/teachers/form' render={() => {
                        return (
                            <div>Teacher form
                                <form>
                                    <input
                                        name='name'
                                        className = 'required'
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
                    }}/>
                </div>
            </div>
        )
    }
}

export default withRouter(Teachers)