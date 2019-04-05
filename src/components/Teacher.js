import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import API from '../api'
import noPhoto from '../images/teacher.png'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import NotFound from './NotFound'
import PageUpload from './PageUpload'

class Teacher extends Component {
    constructor(props) {
        super(props)
        this.state = {
            teacher: {},
            comments: {
                result: []
            },
            //for check response data
            responseStatus: ''
        }
    }

    componentDidMount() {
        API.get(`teacher/${this.props.match.params.id}`)
            .then(function (response) {
              if(response.data) {
                this.setState({
                  teacher: response.data,
                  responseStatus: 'true'
                })
              } else {
                this.setState({
                  responseStatus: 'null'
                })
              }
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
        let item = this.state.comments.result.length
        return (
          <div className=''>
            {(() => {
              switch (this.state.responseStatus) {
                case 'true':
                  return <div className=''>
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
                                accessor: 'content',
                                Cell: row => (<textarea
                                  disabled
                                  className='feedback'
                                  rows='5'
                                  value={row.original.content}
                                ></textarea>)
                              },
                              {
                                Header: 'Date',
                                accessor: 'date',
                                Cell: row => (
                                  <span>{new Date(row.original.date).toLocaleString()}</span>
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
                case 'null':
                  return <NotFound/>
                default:
                  return <PageUpload/>
              }
            })()}
          </div>
        )
    }
}

export default withRouter(Teacher)