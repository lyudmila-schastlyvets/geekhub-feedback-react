import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import API from '../api'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import logo from '../images/teacher.png'

class TeachersList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            teachers: []
        }

        this.handleDelete = this.handleDelete.bind(this)
    }

    componentDidMount() {
        API.get('teacher')
            .then(function (response) {
                this.setState({
                    teachers: response.data
                })
            }.bind(this))

            .catch(function (error) {
                    console.log('error ' + error)
                }
            )
    }

    handleDelete(event) {
        if (window.confirm('Do you want delete ' + event.name + '?')) {
            API.get(`removeteacher/${event._id}`)
                .then(res => {
                    console.log(res)
                    console.log(res.data)
                })
                .catch(function (error) {
                        console.log('error ' + error)
                    }
                )
            API.get('teacher')
                .then(function (response) {
                    this.setState({
                        teachers: response.data
                    })
                }.bind(this))

                .catch(function (error) {
                        console.log('error ' + error)
                    }
                )
        }
    }

    render() {
        var item = this.state.teachers.length
        return (
            <div>
                <h1>Teachers</h1>
                <Link to='/admin/form_teacher'>Add teacher</Link>
                <div id='teachers' className='teachers-list'>
                    <ReactTable
                        data={this.state.teachers}
                        columns={[
                            {
                                Header: 'Name',
                                accessor: 'name',
                                Cell: row => (
                                    <a onClick={() => this.props.history.push(`/admin/teacher/${row.original._id}`)}>{row.value}</a>
                                )
                            },
                            {
                                Header: 'Image',
                                accessor: 'image',
                                Cell: row => (
                                    <img width='200px' src={row.value ? row.value : logo} alt={row.original.name}/>
                                )
                            },
                            {
                                Header: 'Course',
                                accessor: 'course'
                            },
                            {
                                Header: '',
                                Cell: row => (
                                    <Link
                                        //onClick={() => this.handleDelete(row.original)}
                                        to={`/admin/form_teacher/${row.original._id}`}>Edit</Link>
                                ),
                            },
                            {
                                Header: '',
                                Cell: row => (
                                    <a onClick={() => this.handleDelete(row.original)}>Delete</a>
                                )
                            }
                        ]}
                        pageSize={(item < 10) ? item : 10}
                        className='-striped -highlight'
                        filterable
                    />
                </div>
            </div>
        )
    }
}

export default withRouter(TeachersList)