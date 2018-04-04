import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import API from '../api'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

class Feedback extends Component {
  constructor(props) {
    super(props)

  }
  componentDidMount() {
    console.log(this.props)
  }
  render () {
    const data = [
      {
        comment: 'Comment will be here',
        date: (new Date).toString(),
        teacher: 'Kina'
      },
      {
        comment: 'Text is here',
        date: (new Date).toString(),
        teacher: 'Kirill'
      }]

    const columns = [{
        Header: 'Comment',
        accessor: 'comment'
      }, {
        Header: 'Date',
        accessor: 'date'
      }, {
        Header: 'For teacher',
        accessor: 'teacher'
      }
    ]
    const items = columns.length
    return (
      <div>
        <h1>Feedback</h1>
        <div id='comments'>
          <ReactTable
            data={data}
            columns={columns}
            pageSize={(items < 10) ? items : 10}
            className='-striped -highlight'
            showPageSizeOptions={false}
          />
        </div>
      </div>
    )
  }
}

export default withRouter(Feedback)