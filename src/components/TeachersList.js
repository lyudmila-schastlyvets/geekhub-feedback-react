import React, {Component} from 'react'
import {withRouter, Link, Route} from 'react-router-dom'
import {ModalContainer, ModalDialog} from 'react-modal-dialog-react16'
import API from '../api'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import noPhoto from '../images/teacher.png'

import FormTeacher from './FormTeacher'

class TeachersList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            teachers: [],
            isShowingModal: false
        }

        this.handleDelete = this.handleDelete.bind(this)
    }

    handleClick = () => this.setState({isShowingModal: true})
    handleClose = () => {
        this.setState({isShowingModal: false})
        // update teacher state
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
            // update teacher state after delete
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
                <Link
                    to='/admin/teachers/add_teacher'
                    onClick={this.handleClick}
                    className='mg-bottom btn btn-primary'
                >Add teacher</Link>
                {
                    // modal for form add/edit teacher
                    this.state.isShowingModal &&
                    <ModalContainer onClose={this.handleClose}>
                        <ModalDialog onClose={this.handleClose}>
                            <div className='edit_teacher'>
                            <Route
                                path='/admin/teachers/edit_teacher/:id'
                                render={FormTeacher} />
                            </div>
                            <div className='add_teacher'>
                            <Route
                                path='/admin/teachers/add_teacher'
                                render={FormTeacher} />
                            </div>
                        </ModalDialog>
                    </ModalContainer>
                }
                <div id='teachers' className='teachers-list'>
                    <ReactTable
                        data={this.state.teachers}
                        columns={[
                            {
                                Header: 'Name',
                                accessor: 'name',
                                Cell: row => (
                                    <a
                                        className='teacher-link'
                                        onClick={() => this.props.history.push(
                                            `/admin/teacher/${row.original._id}`
                                    )}>{row.value}</a>
                                )
                            },
                            {
                                Header: 'Image',
                                accessor: 'image',
                                Cell: row => (
                                    <img
                                        width='200px'
                                        // check if image not -> visible standard image
                                        src={row.value ? row.value : noPhoto}
                                        alt={row.original.name}
                                    />
                                )
                            },
                            {
                                Header: 'Course',
                                accessor: 'course'
                            },
                            {
                                Header: '',
                                Cell: row => (
                                    <a className='btn btn-primary color-btn'
                                       onClick={() => {
                                      this.props.history.push(
                                        `/admin/teachers/edit_teacher/${row.original._id}`
                                      )
                                      this.handleClick()
                                    }
                                    }>
                                        Edit
                                    </a>
                                ),
                            },
                            {
                                Header: '',
                                Cell: row => (
                                    <a className='btn btn-primary color-btn'
                                       onClick={() => this.handleDelete(row.original)}>
                                        Delete
                                    </a>
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