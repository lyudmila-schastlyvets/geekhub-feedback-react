import React, {Component} from 'react'
import {withRouter, Link, Route} from 'react-router-dom'
import {ModalContainer, ModalDialog} from 'react-modal-dialog-react16'
import API from '../api'
import ReactTable from 'react-table'

import 'react-table/react-table.css'

import FormCourse from './FormCourse'

class Courses extends Component {
    constructor(props) {
        super(props)
        this.state = {
            courses: [],
            isShowingModal: false
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    handleClick = () => this.setState({isShowingModal: true})
    handleClose = () => window.location.reload()

    componentDidMount() {
        API.get('course')
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

    handleDelete(event) {
        if (window.confirm('Do you want delete ' + event.name + '?')) {
            API.delete(`course/${event._id}`)
                .then(res => {
                  // update course state after delete
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
                })
                .catch(function (error) {
                        console.log('error ' + error)
                    }
                )
        }
    }

    render() {
        let item = this.state.courses.length
        return (
            <div>
                <h1>Courses</h1>
                <Link
                    to='/admin/courses/add_course'
                    onClick={this.handleClick}
                    className='mg-bottom btn btn-primary'
                >Add course</Link>
                {
                    // modal for form add/edit course
                    this.state.isShowingModal &&
                    <ModalContainer onClose={this.handleClose}>
                        <ModalDialog onClose={this.handleClose}>
                            <div className='edit-course'>
                                <Route
                                    path='/admin/courses/edit_course/:id'
                                    render={FormCourse}/>
                            </div>
                            <div className='add-course'>
                                <Route
                                    path='/admin/courses/add_course'
                                    render={FormCourse}/>
                            </div>
                        </ModalDialog>
                    </ModalContainer>
                }
                <div id='courses' className='courses-list'>
                    <ReactTable
                        data={this.state.courses}
                        columns={[
                            {
                                Header: 'Name',
                                accessor: 'name'
                            },
                            {
                                Header: '',
                                Cell: row => (
                                    <a className='btn btn-primary color-btn'
                                       onClick={() => {
                                           this.props.history.push(
                                               `/admin/courses/edit_course/${row.original._id}`
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

export default withRouter(Courses)