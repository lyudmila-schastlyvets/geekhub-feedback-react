import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import API from '../api'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

class Feedback extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comments: []
    }

  }
  componentDidMount() {
    API.get('commentslist/')
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
  render () {
    const columns = [{
        Header: 'Comment',
        accessor: 'content'
      }, {
        Header: 'Date',
        accessor: 'date'
      }, {
        Header: 'For teacher',
        accessor: 'teacherName',
        Cell: row => (
          <a
            className='teacher-link'
            onClick={() => this.props.history.push(
              `/admin/teacher/${row.original.forTeacher}`
            )}>{row.value}</a>)
      }
    ]
    const items = this.state.comments.length
    return (
      <div>
        <h1>Feedback</h1>
        <div id='comments'>
          <ReactTable
            data={this.state.comments}
            columns={columns}
            pageSize={(items < 10) ? items : 10}
            className='-striped -highlight'
            showPageSizeOptions={false}
            noDataText='No comments were found.'
            minRows={10}
          />
        </div>
      </div>
    )
  }
}

export default withRouter(Feedback)