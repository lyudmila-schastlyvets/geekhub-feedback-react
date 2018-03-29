import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import axios from 'axios'

class Teachers extends Component {

    componentDidMount() {
        axios.get('https://rocky-sands-24081.herokuapp.com/teacher')
            .then(function (response) {
                document.getElementById('teachers').innerHTML = response.data.map(function (teacher) {
                    return (
                        '<ul class="row">' +
                        '<li class="col">' + teacher.image + '</li>' +
                        '<li class="col">' + teacher.name + '</li>' +
                        '<li class="col">' + teacher.course + '</li>' +
                        '</ul>'
                    )
                }).join('')
            })
            .catch(function (error) {
                    console.log('error ' + error);
                }
            )
    }

    render() {
        return (
            <div>
                <h1>Teachers</h1>
                <Link to='/admin/add_teacher'>Add teacher</Link>
                <div id="teachers" className="teachers-list"></div>
            </div>
        )
    }
}

export default withRouter(Teachers)