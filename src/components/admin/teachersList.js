import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import axios from 'axios'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

class Teachers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            teachers: []
        }
    }

    componentDidMount() {
        axios.get('https://rocky-sands-24081.herokuapp.com/teacher')
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

    render() {
        console.log(this.state.teachers, this.item)
        return (
            <div>
                <h1>Teachers</h1>
                <Link to='/admin/add_teacher'>Add teacher</Link>
                <div id='teachers' className='teachers-list'>
                    <ReactTable
                        data={this.state.teachers}
                        columns={[
                            {
                                Header: 'Name',
                                accessor: 'name',
                            },
                            {
                                Header: 'Image',
                                accessor: 'image'

                            },
                            {
                                Header: 'Course',
                                accessor: 'course',
                            }
                        ]}
                        pageSize={(this.state.teachers.length < 10) ? this.state.teachers.length : 10}
                        className='-striped -highlight'
                        filterable
                    />
                </div>
            </div>
        )
    }
}

export default withRouter(Teachers)