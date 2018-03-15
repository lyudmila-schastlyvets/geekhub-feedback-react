import React, { Component } from 'react'
import { Route, Link, withRouter } from 'react-router-dom'

class Teachers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            course: ''
        }

        this.nameChange = this.nameChange.bind(this)
        this.courseChange = this.courseChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    nameChange(event) {
        this.setState({name: event.target.name})
    }

    courseChange(event) {
        this.setState({course: event.target.course})
    }

    handleSubmit(event) {
        event.preventDefault()
        this.setState({
            name: this.state.name,
            course: this.state.course
        })
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
                                        className='required'
                                        name='name'
                                        type='text'
                                        placeholder='Name'
                                        onChange={this.nameChange}
                                    /><br/>
                                    <select value={this.state.course}
                                            onChange={this.courseChange}>
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