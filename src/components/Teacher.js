import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import API from '../api'
import noPhoto from '../images/teacher.png'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

class Teacher extends Component {
    constructor(props) {
        super(props)
        this.state = {
            teacher: {},
            comments: {
                result: []
            },
            //for check loading data
            loading: false
        }
    }

    componentDidMount() {
        API.get(`teacher/${this.props.match.params.id}`)
            .then(function (response) {
                this.setState({
                    teacher: response.data,
                    loading: true
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
        var item = this.state.comments.result.length
        return (
            <div className={this.state.loading ? 'visible' : 'hide'}>
                <div className='teacher-info'>
                    <h1>{this.state.teacher.name}</h1>
                    <img
                        src={this.state.teacher.image ? this.state.teacher.image : noPhoto}
                        alt={this.state.teacher.name}
                    />
                    <p>Course: {this.state.teacher.course}</p>
                </div>
                <div className='comments'>
                    <h3>Feedback</h3>
                    <div id='teacher_comments' className='teacher-comments'>
                        {(item === 0) ?
                            <div>No feedback</div> :
                            <ReactTable
                                data={this.state.comments.result}
                                columns={[
                                    {
                                        Header: 'Comments',
                                        accessor: 'content'
                                    },
                                    {
                                        Header: 'Date',
                                        accessor: 'date',
                                        Cell: row => (
                                            require('dateformat')(row.value, 'dd mmm yyyy HH:MM:ss')
                                        )
                                    }
                                ]}
                                pageSize={(item < 10) ? item : 10}
                                className='-striped -highlight'
                            />
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Teacher)