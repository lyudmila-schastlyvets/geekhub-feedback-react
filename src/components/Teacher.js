import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import API from '../api'

class Teacher extends Component {
    constructor(props) {
        super(props)
        this.state = {
            teacher: {},
            comments: []
        }
    }

    componentDidMount(props) {
        console.log(props.match.params.id)
        API.get(`teacher/${props.match.params.id}`)
            .then(function (response) {
                this.setState({
                    teacher: response.data
                })
            }.bind(this))

            .catch(function (error) {
                    console.log('error ' + error)
                }
            )
        API.get(`comments/${props.match.params.id}`)
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
                    <img src={this.state.teacher.image} alt={this.state.teacher.name}/>
                    <p>{this.state.teacher.course}</p>
                </div>
                <div className='comments'>{this.state.comments}</div>
            </div>
        )
    }
}

export default withRouter(Teacher)