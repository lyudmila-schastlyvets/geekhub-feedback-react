import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import API from '../api'
import noPhoto from '../images/teacher.png'

class Teacher extends Component {
    constructor(props) {
        super(props)
        this.state = {
            teacher: {},
            comments: {
                result: []
            }
        }
    }

    componentDidMount() {
        API.get(`teacher/${this.props.match.params.id}`)
            .then(function (response) {
                this.setState({
                    teacher: response.data
                })
            }.bind(this))

            .catch(function (error) {
                    console.log('error ' + error)
                }
            )
        API.get(`comments/${this.props.match.params.id}`)
            .then(function (response) {
                this.setState({
                    comments: response.data
                })
            }.bind(this))

            .catch(function (error) {
                    console.log('error ' + error)
                }
            )
    }

    render() {
        return (
            <div>
                <div className='teacher-info'>
                    <h1>{this.state.teacher.name}</h1>
                    <img
                        src={this.state.teacher.image ? this.state.teacher.image : noPhoto}
                        alt={this.state.teacher.name}
                    />
                    <p>{this.state.teacher.course}</p>
                </div>
                <div className='comments'>
                    <h3>Feedback</h3>
                    <ul>{this.state.comments.result.map(function (comment, key) {
                        return (<li key={key}>{comment.content}</li>)
                    })}
                    </ul>
                </div>
            </div>
        )
    }
}

export default withRouter(Teacher)